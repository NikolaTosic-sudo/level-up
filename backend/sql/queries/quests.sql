-- name: CreateQuest :exec
INSERT INTO quests(created_at, updated_at, name, experience, user_id) VALUES (NOW(), NOW(), $1, $2, $3);
