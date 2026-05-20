-- +goose up
CREATE TABLE users(
  id UUID PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  firstName TEXT NULL,
  lastName TEXT NULL,
  nickname TEXT NULL,
  dateOfBirth DATE,
  email TEXT UNIQUE NOT NULL ,
  password TEXT NOT NULL,
  hot_streak INTEGER,
  quests_completed INTEGER,
  repeating_completed INTEGER,
  customs_completed INTEGER,
  experience INTEGER,
  experience_needed INTEGER,
  level INTEGER
);

-- +goose down
DROP TABLE users;
