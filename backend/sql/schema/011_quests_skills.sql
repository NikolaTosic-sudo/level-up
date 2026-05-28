-- +goose up
CREATE TABLE quests_skills(
  quest_id BIGINT NOT NULL REFERENCES quests(id) ON DELETE CASCADE,

  user_id UUID NOT NULL,
  skill_id INTEGER NOT NULL,

  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,

  PRIMARY KEY (quest_id, user_id, skill_id),

  FOREIGN KEY (user_id, skill_id)
    REFERENCES users_skills(user_id, skill_id)
    ON DELETE CASCADE
);

ALTER TABLE quests
ADD COLUMN completed_at TIMESTAMP;

ALTER TABLE quests
ADD COLUMN deleted_at TIMESTAMP;
