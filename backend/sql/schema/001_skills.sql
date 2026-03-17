-- +goose up
CREATE TABLE skills(
  ID UUID PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  name TEXT NOT NULL
);

-- +goose down
DROP TABLE skills;
