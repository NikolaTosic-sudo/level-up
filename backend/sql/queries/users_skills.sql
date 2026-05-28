-- name: GetUserSkillID :one
SELECT skill_id FROM users_skills WHERE user_id = $1 AND name = $2;

-- name: GetUsersSkills :many
SELECT
  parent.skill_id,
  parent.name,
  parent.experience,
  parent.experience_needed,
  parent.level,
COALESCE(
  jsonb_agg(
    jsonb_build_object(
      'id', child.skill_id,
      'name', child.name
    )
  ) FILTER (WHERE child.skill_id IS NOT NULL),
  '[]'::jsonb
)::text AS linked_skills
FROM users_skills parent
LEFT JOIN users_skills_links link
  ON link.user_id = parent.user_id
  AND link.parent_skill_id = parent.skill_id
  AND link.deleted_at IS NULL
LEFT JOIN users_skills child
  ON child.user_id = parent.user_id
  AND child.skill_id = link.child_skill_id
WHERE parent.user_id = $1
GROUP BY
  parent.skill_id,
  parent.name,
  parent.experience,
  parent.experience_needed,
  parent.level;

-- name: GetUsersSkillsExclude :many
SELECT name, skill_id FROM users_skills WHERE user_id = $1 AND name LIKE $2 AND skill_id != ALL($3::int[]) AND name != $4;

-- name: GetUsersSkillsLinkedID :many
SELECT child_skill_id FROM users_skills_links WHERE parent_skill_id = $1 AND user_id = $2 AND deleted_at IS NULL;

-- name: CreateUsersSkills :exec
INSERT INTO users_skills(user_id, skill_id, created_at, updated_at, name, experience, experience_needed, level) VALUES ($1, $2, NOW(), NOW(), $3, 0, 100, 1);

-- name: CreateUsersSkillsLinks :exec
INSERT INTO users_skills_links(user_id, parent_skill_id, child_skill_id, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW());

-- name: DeactivateRemovedLinkedSkills :exec
UPDATE users_skills_links
SET deleted_at = NOW(),
    updated_at = NOW()
WHERE user_id = $1
  AND parent_skill_id = $2
  AND deleted_at IS NULL
  AND child_skill_id != ALL($3::int[]);

-- name: UpsertLinkedSkills :exec
INSERT INTO users_skills_links (
  user_id,
  parent_skill_id,
  child_skill_id,
  created_at,
  updated_at,
  deleted_at
)
SELECT
  $1,
  $2,
  child_id,
  NOW(),
  NOW(),
  NULL
FROM unnest($3::int[]) AS child_id
ON CONFLICT (user_id, parent_skill_id, child_skill_id)
DO UPDATE SET
  deleted_at = NULL,
  updated_at = NOW();
