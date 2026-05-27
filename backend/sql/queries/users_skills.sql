-- name: GetUserSkillID :one
SELECT skill_id FROM users_skills WHERE user_id = $1 AND name = $2;

-- name: GetUsersSkills :many
SELECT name, experience, experience_needed, level FROM users_skills WHERE user_id = $1;

-- name: GetUsersSkillsExclude :many
SELECT name, skill_id FROM users_skills WHERE user_id = $1 AND name LIKE $2 AND skill_id != ALL($3::int[]) AND name != $4;

-- name: GetUsersSkillsLinkedID :many
SELECT child_skill_id FROM users_skills_links WHERE parent_skill_id = $1 AND user_id = $2;

-- name: CreateUsersSkills :exec
INSERT INTO users_skills(user_id, skill_id, created_at, updated_at, name, experience, experience_needed, level) VALUES ($1, $2, NOW(), NOW(), $3, 0, 100, 1);

-- name: CreateUsersSkillsLinks :exec
INSERT INTO users_skills_links(user_id, parent_skill_id, child_skill_id, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW());
