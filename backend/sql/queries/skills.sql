-- name: GetAllSkills :many
SELECT name FROM skills ORDER BY name LIMIT 200;

-- name: GetSkillsByName :many
SELECT id, name FROM skills WHERE name LIKE $1 ORDER BY name LIMIT 200;

-- name: GetUsersSkillsLinkedName :one
SELECT name FROM skills WHERE id = $1;

-- name: GetSkillsNotOwnedByUser :many
SELECT s.id, s.name FROM skills s
WHERE s.name LIKE $1 AND NOT EXISTS (
  SELECT 1
  FROM users_skills us
  WHERE us.user_id = $2
    AND us.skill_id = s.id
    AND us.deleted_at IS NULL
)
LIMIT 200;

-- name: CreateSkill :one
INSERT INTO skills(created_at, updated_at, name) VALUES (NOW(), NOW(), $1) RETURNING id;

