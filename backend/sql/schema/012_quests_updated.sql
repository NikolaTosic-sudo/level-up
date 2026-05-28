-- +goose up
ALTER TABLE quests
ADD COLUMN type TEXT;
