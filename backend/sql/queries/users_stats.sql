-- name: GetUsersStatsById :one
SELECT * FROM users_stats WHERE user_id = $1;

-- name: UpdateUsersStats :exec
UPDATE users_stats
SET
  quests_completed = quests_completed + 1,
  repeating_quests_completed = repeating_quests_completed + CASE WHEN $1 = 'd' OR 'w' OR 'm' OR 'y' THEN 1 ELSE 0 END,
  custom_quests_completed = custom_quests_completed + CASE WHEN $1 = 'custom' THEN 1 ELSE 0 END,
  quest_experience_gained = quest_experience_gained + $2,
  updated_at = NOW()
WHERE user_id = $3;
