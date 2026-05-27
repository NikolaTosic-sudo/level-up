-- name: GetUserSkillID :one
SELECT skill_id FROM users_skills WHERE user_id = $1 AND name = $2;

-- name: CreateUsersSkills :exec
INSERT INTO users_skills(user_id, skill_id, created_at, updated_at, name, experience, experience_needed, level) VALUES ($1, $2, NOW(), NOW(), $3, 0, 100, 1);

-- name: CreateUsersSkillsLinks :exec
INSERT INTO users_skills_links(user_id, parent_skill_id, child_skill_id, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW());
