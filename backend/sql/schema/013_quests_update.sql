-- +goose up
ALTER TABLE quests
ADD COLUMN failed BOOL,
ADD COLUMN failed_at TIMESTAMP;
