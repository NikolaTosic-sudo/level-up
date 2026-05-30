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
  AND child.deleted_at IS NULL
WHERE parent.user_id = $1
  AND parent.deleted_at IS NULL
GROUP BY
  parent.skill_id,
  parent.name,
  parent.experience,
  parent.experience_needed,
  parent.level;

-- name: GetUsersSkillsExclude :many
SELECT name, skill_id FROM users_skills
WHERE user_id = $1
  AND name LIKE $2
  AND skill_id != ALL($3::int[])
  AND name != $4
  AND deleted_at IS NULL;

-- name: GetUsersSkillsLinkedID :many
SELECT child_skill_id FROM users_skills_links
WHERE parent_skill_id = $1 AND user_id = $2 AND deleted_at IS NULL;

-- name: GetUsersSkillHighestLevel :one
SELECT name FROM users_skills
WHERE user_id = $1 AND deleted_at IS NULL
ORDER BY level DESC, experience DESC
LIMIT 1;

-- name: GetMostRecentLeveledSkill :one
SELECT name FROM users_skills
WHERE user_id = $1 AND deleted_at IS NULL
ORDER BY leveled_at DESC
LIMIT 1;

-- name: CreateUsersSkills :exec
INSERT INTO users_skills(
  user_id,
  skill_id,
  created_at,
  updated_at,
  name,
  experience,
  experience_needed,
  level
) VALUES (
  $1,
  $2,
  NOW(),
  NOW(),
  $3,
  0,
  100,
  1
)
ON CONFLICT (user_id, skill_id)
DO UPDATE SET
  deleted_at = NULL,
  deleted_reason = NULL,
  updated_at = NOW();

-- name: DeactivateRemovedLinkedSkills :exec
UPDATE users_skills_links
SET deleted_at = NOW(),
    deleted_reason = 'manual',
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
  deleted_reason = NULL,
  updated_at = NOW();

-- name: SoftDeleteUserSkill :exec
WITH deleted_skill AS (
  UPDATE users_skills
  SET
    deleted_at = NOW(),
    deleted_reason = 'manual',
    updated_at = NOW()
  WHERE users_skills.user_id = $1
    AND users_skills.skill_id = $2
    AND users_skills.deleted_at IS NULL
)
UPDATE users_skills_links
SET
  deleted_at = NOW(),
  deleted_reason = CASE
    WHEN parent_skill_id = $2 THEN 'parent_skill_deleted'
    WHEN child_skill_id = $2 THEN 'child_skill_deleted'
  END,
  updated_at = NOW()
WHERE users_skills_links.user_id = $1
  AND users_skills_links.deleted_at IS NULL
  AND (
    parent_skill_id = $2
    OR child_skill_id = $2
  );

-- name: GetSkillsExperience :one
SELECT experience, experience_needed, level FROM users_skills WHERE skill_id = $1 AND user_id = $2 AND deleted_at IS NULL;

-- name: UpdateSkillsExperience :exec
UPDATE users_skills SET experience = $3, experience_needed = $4, level = $5 WHERE skill_id = $1 AND user_id = $2;
