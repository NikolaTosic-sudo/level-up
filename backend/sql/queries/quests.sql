-- name: GetUsersRepeatingQuests :many
SELECT q.id, q.type, q.name, q.experience, q.completed,
  (
    SELECT COUNT(*)
    FROM quests sub
    WHERE sub.parent_quest_id = q.id
      AND sub.user_id = q.user_id
      AND sub.deleted_at IS NULL
      AND sub.completed = true
  ) as completed_sub_quests
FROM quests q
WHERE q.user_id = $1
  AND q.deleted_at IS NULL 
  AND q.type != 'custom'
  AND q.parent_quest_id IS NULL
ORDER BY q.type, q.completed, q.name;

-- name: GetUsersCustomQuests :many
SELECT q.id, q.type, q.name, q.experience, q.completed, q.start_date, q.end_date,
  (
    SELECT COUNT(*)
    FROM quests sub
    WHERE sub.parent_quest_id = q.id
      AND sub.user_id = q.user_id
      AND sub.deleted_at IS NULL
      AND sub.completed = true
  ) as completed_sub_quests
FROM quests q
WHERE q.user_id = $1 
  AND q.deleted_at IS NULL
  AND q.type = 'custom'
ORDER BY q.completed;

-- name: GetSubQuests :many
SELECT id, type, name, experience, completed FROM quests
WHERE user_id = $1
  AND deleted_at IS NULL
  AND parent_quest_id = $2;

-- name: GetQuestSkills :many
SELECT
  us.skill_id,
  us.name
FROM quests_skills qs
JOIN users_skills us
  ON us.user_id = qs.user_id
  AND us.skill_id = qs.skill_id
WHERE qs.quest_id = $2
  AND qs.user_id = $1
  AND us.deleted_at IS NULL
ORDER BY us.name ASC;

-- name: CreateQuest :one
INSERT INTO quests(created_at, updated_at, name, experience, user_id, type, start_date, end_date) VALUES (NOW(), NOW(), $1, $2, $3, $4, $5, $6) RETURNING id;

-- name: CreateSubQuest :exec
INSERT INTO quests(created_at, updated_at, name, experience, user_id, parent_quest_id) VALUES (NOW(), NOW(), $1, $2, $3, $4);

-- name: CreateQuestSkills :exec
INSERT INTO quests_skills(quest_id, user_id, skill_id, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW());

-- name: UpdateQuest :exec
UPDATE quests
SET
  updated_at = NOW(),
  name = $2,
  type = $3,
  experience = $4,
  start_date = $5,
  end_date = $6
WHERE id = $1;

-- name: DeleteQuestSkills :exec
DELETE FROM quests_skills WHERE user_id = $1 AND quest_id = $2;

-- name: GetSubQuestsIDs :many
SELECT id FROM quests WHERE parent_quest_id = $1;

-- name: DeleteSubQuest :exec
DELETE FROM quests WHERE user_id = $1 AND id = $2;

-- name: CompleteQuest :one
UPDATE quests SET completed = TRUE, completed_at = NOW() WHERE id = $1 AND user_id = $2 RETURNING experience;

-- name: GetSkillsForQuest :many
SELECT skill_id FROM quests_skills WHERE quest_id = $1;

-- name: GetCompletedQuestStats :one
SELECT
  COUNT(*) FILTER (WHERE completed = TRUE AND parent_quest_id IS NULL) AS all_completed,
  COUNT(*) FILTER (WHERE completed = TRUE AND type = 'custom') AS custom_completed,
  COUNT(*) FILTER (WHERE completed = TRUE AND type != 'custom') AS repeating_completed,
  COUNT(*) FILTER (WHERE completed = TRUE AND parent_quest_id IS NOT NULL) AS sub_quests_completed
FROM quests
WHERE user_id = $1
  AND deleted_at IS NULL;
