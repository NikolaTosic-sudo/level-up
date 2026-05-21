package main

import (
	"github.com/NikolaTosic-sudo/level-up/backend/internal/database"
	"github.com/google/uuid"
)

type appConfig struct {
	database *database.Queries
	users    map[uuid.UUID]User
	secret   string
}

type User struct {
	Id       uuid.UUID
	Nickname string
	Email    string
}
