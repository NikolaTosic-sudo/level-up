-- name: CreateUser :one
INSERT INTO users(id, created_at, updated_at, email, password)
VALUES(
  gen_random_uuid(),
  NOW(),
  NOW(),
  $1,
  $2
) RETURNING id, email;

-- name: GetUserByEmail :one
SELECT * FROM users WHERE email = $1;

-- name: UpdateUserProfile :exec
UPDATE users SET firstName = $1, lastName = $2, nickname = $3, dateOfBirth = $4, bio = $5 WHERE email = $6;

-- name: GetUserByID :one
SELECT * FROM users WHERE id = $1;

-- name: UpdateUserFirstName :exec
UPDATE users SET firstName = $1 WHERE id = $2;

-- name: UpdateUserLastName :exec
UPDATE users SET lastName = $1 WHERE id = $2;

-- name: UpdateUserEmail :exec
UPDATE users SET email = $1 WHERE id = $2;

-- name: UpdateUserNickname :exec
UPDATE users SET nickname = $1 WHERE id = $2;

-- name: UpdateUserDateOfBirth :exec
UPDATE users SET dateOfBirth = $1 WHERE id = $2;

-- name: UpdateUserBio :exec
UPDATE users SET bio = $1 WHERE id = $2;
