package main

import (
	"fmt"
	"net/http"

	"github.com/NikolaTosic-sudo/level-up/backend/internal/auth"
	"github.com/google/uuid"
)

func (cfg *appConfig) getUserId(r *http.Request) (uuid.UUID, error) {
	userId, err := uuid.NewUUID()
	if err != nil {
		return userId, err
	}

	userC, err := r.Cookie("access_token")
	if err != nil {
		return userId, err
	}

	if userC.Value == "" {
		return userId, fmt.Errorf("invalid access token")
	}

	userId, err = auth.ValidateJWT(userC.Value, cfg.secret)
	if err != nil {
		return userId, err
	}

	return userId, err
}
