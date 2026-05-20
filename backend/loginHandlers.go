package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/NikolaTosic-sudo/level-up/backend/internal/auth"
	"github.com/NikolaTosic-sudo/level-up/backend/internal/database"
)

type LoginBody struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// @Tags Login
// @Summary Sign up the user
// @Description take the email and the password, hash the password, create the user and make cookies
// @Accept json
// @Produce json
// @Success 200
// @Param body body LoginBody true "Login/Signup payload"
// @Router /v1/levelup_api/signUp [post]
func (cfg *appConfig) signupHandler(w http.ResponseWriter, r *http.Request) {
	var b LoginBody

	data, err := io.ReadAll(r.Body)

	json.Unmarshal(data, &b)

	email := b.Email
	password := b.Password

	fmt.Println(email, password)

	if email == "" || password == "" {
		w.WriteHeader(500)
		return
	}

	hashedPassword, err := auth.HashedPassword(password)
	if err != nil {
		w.WriteHeader(500)
		return
	}

	user, err := cfg.database.CreateUser(r.Context(), database.CreateUserParams{
		Email:    email,
		Password: hashedPassword,
	})
	if err != nil {
		if strings.Contains(err.Error(), "violates unique constraint") {
			writeJSONError(w, 401, "not unique")
			if err != nil {
				w.WriteHeader(500)
				return
			}
		}
		w.WriteHeader(500)

		return
	}

	token, err := auth.MakeJWT(user.ID, cfg.secret)
	if err != nil {
		w.WriteHeader(500)
		return
	}

	refreshString, err := auth.MakeRefreshToken()
	if err != nil {
		w.WriteHeader(500)
		return
	}

	_, err = cfg.database.CreateRefreshToken(r.Context(), database.CreateRefreshTokenParams{
		Token:     refreshString,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
		UserID:    user.ID,
		ExpiresAt: time.Now().Add(time.Hour * 168),
	})
	if err != nil {
		w.WriteHeader(500)
		return
	}

	c := cfg.makeCookieMaxAge("access_token", token, "/", 3600)

	refreshC := cfg.makeCookie("refresh_token", refreshString, "/api/refresh")

	http.SetCookie(w, &c)
	http.SetCookie(w, &refreshC)

	cfg.users[user.ID] = User{
		Id:    user.ID,
		Email: user.Email,
	}

	w.Header().Add("Hx-Redirect", "/private")
	w.WriteHeader(200)
}
