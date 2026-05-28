-- +goose up
CREATE TABLE users_skills(
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  skill_id INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  experience INTEGER NOT NULL DEFAULT 0,
  experience_needed INTEGER NOT NULL DEFAULT 100,
  level INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (user_id, skill_id),

  UNIQUE (user_id, name)
);

CREATE TABLE users_skills_links(
  user_id UUID NOT NULL,
  parent_skill_id INTEGER NOT NULL,
  child_skill_id INTEGER NOT NULL,

  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  deleted_at TIMESTAMP NULL,

  PRIMARY KEY (user_id, parent_skill_id, child_skill_id),

  FOREIGN KEY (user_id, parent_skill_id)
    REFERENCES users_skills(user_id, skill_id)
    ON DELETE CASCADE,

  FOREIGN KEY (user_id, child_skill_id)
    REFERENCES users_skills(user_id, skill_id)
    ON DELETE CASCADE,

  CHECK (parent_skill_id <> child_skill_id)
);

-- +goose down
DROP TABLE users_skills CASCADE;

DROP TABLE users_skills_links CASCADE;
