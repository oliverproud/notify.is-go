package statements

const (
	// DefaultUpdateStatement updates a records timestamp if nothing else is updated
	DefaultUpdateStatement = `
  UPDATE users
  SET timestamp = (now() at time zone 'utc')
  WHERE id = $1;
  `

	// InstagramUpdateStatement updates the instagram column and timestamp if a username is available
	InstagramUpdateStatement = `
  UPDATE users
  SET instagram = false, timestamp = (now() at time zone 'utc')
  WHERE id = $1;
  `
	// TwitterUpdateStatement updates the twitter column and timestamp if a username is available
	TwitterUpdateStatement = `
  UPDATE users
  SET twitter = false, timestamp = (now() at time zone 'utc')
  WHERE id = $1;
  `
)
