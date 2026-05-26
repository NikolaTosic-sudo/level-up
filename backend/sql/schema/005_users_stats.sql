-- +goose up
CREATE TABLE users_stats(
  user_id UUID PRIMARY KEY REFERENCES users(id),
  quests_completed INTEGER NOT NULL DEFAULT 0,
  repeating_quests_completed INTEGER NOT NULL DEFAULT 0,
  custom_quests_completed INTEGER NOT NULL DEFAULT 0,
  quest_experience_gained INTEGER NOT NULL DEFAULT 0,
  skill_experience_gained INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- +goose down
DROP TABLE users_stats;
