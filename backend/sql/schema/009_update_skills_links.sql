-- +goose up
ALTER TABLE users_skills_links
ADD COLUMN deleted_reason TEXT,
ADD CONSTRAINT users_skills_links_deleted_reason_check
CHECK (
  deleted_reason IS NULL
  OR deleted_reason IN ('manual', 'parent_skill_deleted', 'child_skill_deleted')
);

ALTER TABLE users_skills
ADD COLUMN deleted_reason TEXT,
ADD CONSTRAINT users_skills_deleted_reason_check
CHECK (
  deleted_reason IS NULL
  OR deleted_reason IN ('manual', 'admin', 'account_cleanup')
);
