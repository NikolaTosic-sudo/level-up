package main

import (
	"github.com/NikolaTosic-sudo/level-up/backend/internal/database"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

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
