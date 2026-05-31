package main

import (
	"net/http"

	"github.com/NikolaTosic-sudo/level-up/backend/internal/database"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type txHandler func(w http.ResponseWriter, r *http.Request, qtx *database.Queries) ErrorResponseInternal

type appConfig struct {
	db       *pgxpool.Pool
	database *database.Queries
	users    map[uuid.UUID]User
	secret   string
}

type User struct {
	Id       uuid.UUID
	Nickname string
	Email    string
}

type ErrorResponseInternal struct {
	code    int
	message string
	err     error
}
