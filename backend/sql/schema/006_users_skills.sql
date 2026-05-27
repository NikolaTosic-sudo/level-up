-- +goose up
CREATE TABLE users_skills(
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  skill_id INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  experience INTEGER,
  experience_needed INTEGER,
  level INTEGER,
  PRIMARY KEY (user_id, skill_id),

  UNIQUE (user_id, name)
);

CREATE TABLE users_skills_links(
  user_id UUID NOT NULL,
  parent_skill_id INTEGER NOT NULL,
  child_skill_id INTEGER NOT NULL,

  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,

  PRIMARY KEY (user_id, parent_skill_id, child_skill_id),

  FOREIGN KEY (user_id, parent_skill_id)
    REFERENCES users_skills(user_id, skill_id)
    ON DELETE CASCADE,

  FOREIGN KEY (user_id, child_skill_id)
    REFERENCES users_skills(user_id, skill_id)
    ON DELETE CASCADE,

  CHECK (parent_skill_id <> child_skill_id)
);
