-- +goose up
ALTER TABLE users_skills ADD COLUMN deleted_at TIMESTAMP;
