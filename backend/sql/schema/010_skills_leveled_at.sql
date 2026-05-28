-- +goose up
ALTER TABLE users_skills
ADD COLUMN leveled_at TIMESTAMP;
