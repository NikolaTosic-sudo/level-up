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

-- name: CreateQuest :exec
INSERT INTO quests(created_at, updated_at, name, experience, user_id, type) VALUES (NOW(), NOW(), $1, $2, $3, $4);

-- name: CreateSubQuest :exec
INSERT INTO quests(created_at, updated_at, name, experience, user_id, parent_quest_id) VALUES (NOW(), NOW(), $1, $2, $3, $4);
