package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"notify.is-go/check"
	"notify.is-go/database"
	"notify.is-go/sendgrid"
	"notify.is-go/statements"
	"notify.is-go/timeDiff"
	//Postgres driver
	"github.com/getsentry/sentry-go"
	sentryhttp "github.com/getsentry/sentry-go/http"
	_ "github.com/lib/pq"
)

var id []uint8
var timestamp time.Time
var instagram, twitter bool
var firstName, email, username, updateStatement string

func runInstagramCheck(email, firstName, username string) error {
	if err := check.Instagram(email, firstName, username); err != nil {
		return err
	}
	if check.InstagramAvailable {
		resp, err := sendgrid.SuccessEmailInstagram(email, firstName, username)
		if err != nil {
			return err
		}
		numUpdated, err := database.UpdateRecords(db, statements.InstagramUpdateStatement, id)
		if err != nil {
			return err
		}
		fmt.Println("Sendgrid Response:", resp.StatusCode)
		fmt.Println("Number of records updated:", numUpdated)
	}
	return nil
}

func runTwitterCheck(email, firstName, username string) error {
	twitterAvailable, err := check.Twitter(username)
	if err != nil {
		return err
	}

	if twitterAvailable {
		resp, err := sendgrid.SuccessEmailTwitter(email, firstName, username)
		if err != nil {
			return err
		}
		numUpdated, err := database.UpdateRecords(db, statements.TwitterUpdateStatement, id)
		if err != nil {
			return err
		}
		fmt.Println("Sendgrid Response:", resp.StatusCode)
		fmt.Println("Number of records updated:", numUpdated)
	}
	return nil
}

func runCheck() error {
	log.Println("Starting check...")

	selectStatement := `SELECT id, first_name, email, username, instagram, twitter, timestamp FROM users WHERE EXTRACT(EPOCH FROM ((now() at time zone 'utc') - timestamp)) > 43200.0`

	rows, err := database.SelectRecords(db, selectStatement)
	if err != nil {
		return err
	}

	defer rows.Close()
	for rows.Next() {

		if err = rows.Scan(&id, &firstName, &email, &username, &instagram, &twitter, &timestamp); err != nil {
			return err
		}

		timeDiff.CalculateDiff(timestamp)
		fmt.Println("Username:", username)

		if instagram && twitter {
			fmt.Println("Run both Instagram and Twiter")
			// Instagram check
			if err := runInstagramCheck(email, firstName, username); err != nil {
				return err
			}
			// Twitter check
			if err := runTwitterCheck(email, firstName, username); err != nil {
				return err
			}
		} else if instagram {
			fmt.Println("Run Instagram")
			if err := runInstagramCheck(email, firstName, username); err != nil {
				return err
			}
		} else if twitter {
			fmt.Println("Run Twitter")
			if err := runTwitterCheck(email, firstName, username); err != nil {
				return err
			}
		}

		// Default update statement if usernames are not available
		numUpdated, err := database.UpdateRecords(db, statements.DefaultUpdateStatement, id)
		if err != nil {
			return err
		}
		fmt.Println("Number of records updated:", numUpdated)
	}

	// Get any error encountered during iteration
	if err = rows.Err(); err != nil {
		return err
	}
	return nil
}

func handler(w http.ResponseWriter, r *http.Request) {

	keys, ok := r.URL.Query()["auth"]
	if !ok || len(keys[0]) < 1 || keys[0] != os.Getenv("SERVER_PASSWORD") {
		fmt.Fprintf(w, "You are not authorised to access this page")
	} else {
		log.Print("Notify.is: received a request")

		if err := runCheck(); err != nil {
			sentry.CaptureException(err)
			fmt.Println(err)
			fmt.Println("Returning...")
			return
		}
		fmt.Fprintf(w, "Ready to process requests.\n")
	}
}

var db *sql.DB

func init() {

	// Setenv here
	***REMOVED***("SENTRY_DSN", "***REMOVED***")
	***REMOVED***("SERVER_PASSWORD", "***REMOVED***")
	***REMOVED***("DB_PASSWORD", "***REMOVED***")
	***REMOVED***("DB_HOST", "***REMOVED***")
	***REMOVED***("PORT", "***REMOVED***")

	const (
		port   = 5432
		user   = "postgres"
		dbName = "notify"
	)

	var host = os.Getenv("DB_HOST")
	var password = os.Getenv("DB_PASSWORD")

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=require", host, port, user, password, dbName)

	var err error
	db, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		sentry.CaptureException(err)
		fmt.Printf("%v", err)
		fmt.Println("Returning...")
		return
	}
	if err = db.Ping(); err != nil {
		sentry.CaptureException(err)
		log.Fatal(err)
	}
}

func main() {

	// To initialize Sentry's handler, you need to initialize Sentry itself beforehand
	if err := sentry.Init(sentry.ClientOptions{
		Dsn: os.Getenv("SENTRY_DSN"),
	}); err != nil {
		fmt.Printf("Sentry initialization failed: %v\n", err)
	}

	// Flush buffered events before the program terminates.
	// Set the timeout to the maximum duration the program can afford to wait.
	defer sentry.Flush(2 * time.Second)

	// Create an instance of sentryhttp
	sentryHandler := sentryhttp.New(sentryhttp.Options{})

	log.Print("Notify.is: starting server...")

	http.HandleFunc("/", sentryHandler.HandleFunc(handler))

	log.Printf("Notify.is: listening on port %s", os.Getenv("PORT"))
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("PORT")), nil))

}
