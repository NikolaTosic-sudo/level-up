-- name: GetAllSkills :many
SELECT name FROM skills ORDER BY name LIMIT 200;

-- name: GetSkillsByName :many
SELECT id, name FROM skills WHERE name LIKE $1 ORDER BY name LIMIT 200;

-- name: CreateSkill :one
INSERT INTO skills(created_at, updated_at, name) VALUES (NOW(), NOW(), $1) RETURNING id;

