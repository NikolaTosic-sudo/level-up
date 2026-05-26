package main

import (
	"encoding/json"
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

type LoginResponse struct {
	Code     string `json:"code"`
	Redirect string `json:"redirect"`
}

// @Tags Login
// @Summary Sign up the user
// @Description take the email and the password, hash the password, create the user and make cookies
// @Accept json
// @Produce json
// @Success 200 {object} LoginResponse
// @Param body body LoginBody true "SignUp payload"
// @Router /v1/levelup_api/signUp [post]
func (cfg *appConfig) signupHandler(w http.ResponseWriter, r *http.Request) {
	var b LoginBody

	data, err := io.ReadAll(r.Body)

	json.Unmarshal(data, &b)

	email := b.Email
	password := b.Password

	if email == "" || password == "" {
		writeJSONError(w, http.StatusBadRequest, "signUpBadRequest")
		return
	}

	hashedPassword, err := auth.HashedPassword(password)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error")
		return
	}

	user, err := cfg.database.CreateUser(r.Context(), database.CreateUserParams{
		Email:    email,
		Password: hashedPassword,
	})
	if err != nil {
		if strings.Contains(err.Error(), "violates unique constraint") {
			writeJSONError(w, http.StatusUnauthorized, "emailNotUnique")
			return
		}

		writeJSONError(w, http.StatusInternalServerError, "error")

		return
	}

	token, err := auth.MakeJWT(user.ID, cfg.secret)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error")
		return
	}

	refreshString, err := auth.MakeRefreshToken()
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error")
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
		writeJSONError(w, http.StatusInternalServerError, "error")
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

	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(LoginResponse{
		Code:     "200",
		Redirect: "/profile-creation",
	})
}

// @Tags Login
// @Summary Log In the user
// @Description take the email and the password, hash the password, check for user and login
// @Accept json
// @Produce json
// @Success 200 {object} LoginResponse
// @Param body body LoginBody true "Login payload"
// @Router /v1/levelup_api/logIn [post]
func (cfg *appConfig) loginHandler(w http.ResponseWriter, r *http.Request) {
	var b LoginBody

	data, err := io.ReadAll(r.Body)

	json.Unmarshal(data, &b)

	email := b.Email
	password := b.Password

	if email == "" || password == "" {
		writeJSONError(w, http.StatusBadRequest, "signUpBadRequest")
		return
	}

	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error")
		return
	}

	user, err := cfg.database.GetUserByEmail(r.Context(), email)
	if err != nil {
		if strings.Contains(err.Error(), "no rows in result") {
			writeJSONError(w, http.StatusUnauthorized, "loginNoUserFound")
			return
		}

		writeJSONError(w, http.StatusInternalServerError, "error")
		return
	}

	err = auth.CheckPassword(password, user.Password)
	if err != nil {
		if strings.Contains(err.Error(), "hashedPassword is not the hash of the given password") {
			writeJSONError(w, http.StatusUnauthorized, "loginBadPassword")
			return
		}
		writeJSONError(w, http.StatusInternalServerError, "error")
		return
	}

	token, err := auth.MakeJWT(user.ID, cfg.secret)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error")
		return
	}

	refreshString, err := auth.MakeRefreshToken()
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error")
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
		writeJSONError(w, http.StatusInternalServerError, "error")
		return
	}

	c := cfg.makeCookieMaxAge("access_token", token, "/", 3600)
	refreshC := cfg.makeCookie("refresh_token", refreshString, "/api/refresh")

	http.SetCookie(w, &c)
	http.SetCookie(w, &refreshC)

	cfg.users[user.ID] = User{
		Id:       user.ID,
		Nickname: user.Nickname.String,
		Email:    user.Email,
	}

	redirect := "/profile"

	if user.Nickname.String == "" {
		redirect = "/profile-creation"
	}

	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(LoginResponse{
		Code:     "200",
		Redirect: redirect,
	})
}

func (cfg *appConfig) logoutHandler(w http.ResponseWriter, r *http.Request) {
	c, err := r.Cookie("access_token")
	if err != nil {
		w.Header().Add("Hx-Redirect", "/")
		return
	}

	userId, err := auth.ValidateJWT(c.Value, cfg.secret)
	if err != nil {
		w.Header().Add("Hx-Redirect", "/")
		return
	}

	delete(cfg.users, userId)

	accC := cfg.removeCookie("access_token")
	refreshC := cfg.removeCookiePath("refresh_token", "/api/refresh")

	http.SetCookie(w, &accC)
	http.SetCookie(w, &refreshC)

	w.Header().Add("Hx-Redirect", "/")
}
