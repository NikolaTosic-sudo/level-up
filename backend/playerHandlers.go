package main

import (
	"database/sql"
	"encoding/json"
	"io"
	"net/http"
	"time"

	"github.com/NikolaTosic-sudo/level-up/backend/internal/database"
)

type SkillsCreation struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

type QuestsCreation struct {
	Name       string `json:"name"`
	Experience int    `json:"experience"`
}

type ProfileCreationBody struct {
	FirstName string           `json:"firstName"`
	LastName  string           `json:"lastName"`
	Nickname  string           `json:"nickName"`
	Bio       string           `json:"bio"`
	Date      time.Time        `json:"dateOfBirth"`
	Skills    []SkillsCreation `json:"skills"`
	Quests    []QuestsCreation `json:"quests"`
}

type UserResponse struct {
	Profile                ProfileResponse `json:"profile" binding:"required"`
	Bio                    string          `json:"bio"`
	HighestLeveledSkill    string          `json:"highestLeveledSkill"`
	MostRecentLeveledSkill string          `json:"mostRecentLeveledSkill"`
}

type ProfileResponse struct {
	FirstName   string    `json:"firstName" binding:"required"`
	LastName    string    `json:"lastName" binding:"required"`
	Nickname    string    `json:"nickName" binding:"required"`
	Email       string    `json:"email" binding:"required"`
	DateOfBirth time.Time `json:"dateOfBirth"`
}

type UpdateUserBody struct {
	FirstName string    `json:"firstName"`
	LastName  string    `json:"lastName"`
	Nickname  string    `json:"nickName"`
	Bio       string    `json:"bio"`
	Date      time.Time `json:"dateOfBirth"`
	Email     string    `json:"email"`
	Target    string    `json:"target" binding:"required"`
}

// @Tags Player
// @Summary Create the player
// @Description Create the player with user's info, skills and quests
// @Accept json
// @Produce json
// @Success 200 {object} LoginResponse
// @Param body body ProfileCreationBody true "Profile creation payload"
// @Router /v1/levelup_api/createProfile [post]
func (cfg *appConfig) profileCreationHandler(w http.ResponseWriter, r *http.Request) {
	var body ProfileCreationBody

	b, err := io.ReadAll(r.Body)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	err = json.Unmarshal(b, &body)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	userID, err := cfg.getUserId(r)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	user, err := cfg.database.GetUserByID(r.Context(), userID)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	if len(body.Quests) > 0 {
		for _, q := range body.Quests {
			err = cfg.database.CreateQuest(r.Context(), database.CreateQuestParams{
				Name: q.Name,
				Experience: sql.NullInt32{
					Int32: int32(q.Experience),
					Valid: true,
				},
				UserID: userID,
				Type: sql.NullString{
					String: "d",
					Valid:  true,
				},
			})
			if err != nil {
				writeJSONError(w, http.StatusInternalServerError, "error", err)
				return
			}
		}
	}

	if len(body.Skills) > 0 {
		for _, s := range body.Skills {
			skillId, err := cfg.database.GetUserSkillID(r.Context(), database.GetUserSkillIDParams{
				UserID: userID,
				Name:   s.Name,
			})

			if s.Id == 0 && skillId == 0 {
				skillId, err = cfg.database.CreateSkill(r.Context(), s.Name)
				if err != nil {
					writeJSONError(w, http.StatusInternalServerError, "error", err)
					return
				}
			}

			err = cfg.database.CreateUsersSkills(r.Context(), database.CreateUsersSkillsParams{
				UserID:  userID,
				SkillID: skillId,
				Name:    s.Name,
			})
			if err != nil {
				writeJSONError(w, http.StatusInternalServerError, "error", err)
				return
			}
		}
	}

	err = cfg.database.UpdateUserProfile(r.Context(), database.UpdateUserProfileParams{
		Firstname: sql.NullString{
			String: body.FirstName,
			Valid:  true,
		},
		Lastname: sql.NullString{
			String: body.LastName,
			Valid:  true,
		},
		Nickname: sql.NullString{
			String: body.Nickname,
			Valid:  true,
		},
		Dateofbirth: sql.NullTime{
			Time:  body.Date,
			Valid: true,
		},
		Bio: sql.NullString{
			String: body.Bio,
			Valid:  true,
		},
		Email: user.Email,
	})
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(LoginResponse{
		Code:     "200",
		Redirect: "/profile",
	})
}

// @Tags Player
// @Summary Get the player
// @Description Get everything about the player
// @Produce json
// @Success 200 {object} UserResponse
// @Router /v1/levelup_api/userProfile [get]
func (cfg *appConfig) getFullUser(w http.ResponseWriter, r *http.Request) {
	userID, err := cfg.getUserId(r)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	user, err := cfg.database.GetUserByID(r.Context(), userID)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	highestSkill, err := cfg.database.GetUsersSkillHighestLevel(r.Context(), userID)

	mostRecentLeveled, err := cfg.database.GetMostRecentLeveledSkill(r.Context(), userID)

	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(UserResponse{
		Profile: ProfileResponse{
			FirstName:   user.Firstname.String,
			LastName:    user.Lastname.String,
			Nickname:    user.Nickname.String,
			Email:       user.Email,
			DateOfBirth: user.Dateofbirth.Time,
		},
		Bio:                    user.Bio.String,
		HighestLeveledSkill:    highestSkill,
		MostRecentLeveledSkill: mostRecentLeveled,
	})
}

// @Tags Player
// @Summary Update the player
// @Description Update the player
// @Produce json
// @Accept json
// @Success 200
// @Param body body UpdateUserBody true "User update payload"
// @Router /v1/levelup_api/updateUser [post]
func (cfg *appConfig) updateUser(w http.ResponseWriter, r *http.Request) {
	var res UpdateUserBody

	b, err := io.ReadAll(r.Body)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	userID, err := cfg.getUserId(r)

	json.Unmarshal(b, &res)

	if res.Target == "firstName" && res.FirstName != "" {
		err = cfg.database.UpdateUserFirstName(r.Context(), database.UpdateUserFirstNameParams{
			Firstname: sql.NullString{
				String: res.FirstName,
				Valid:  true,
			},
			ID: userID,
		})
	} else if res.Target == "lastName" && res.LastName != "" {
		err = cfg.database.UpdateUserLastName(r.Context(), database.UpdateUserLastNameParams{
			Lastname: sql.NullString{
				String: res.LastName,
				Valid:  true,
			},
			ID: userID,
		})
	} else if res.Target == "nickname" && res.Nickname != "" {
		err = cfg.database.UpdateUserNickname(r.Context(), database.UpdateUserNicknameParams{
			Nickname: sql.NullString{
				String: res.Nickname,
				Valid:  true,
			},
			ID: userID,
		})
	} else if res.Target == "bio" {
		err = cfg.database.UpdateUserBio(r.Context(), database.UpdateUserBioParams{
			Bio: sql.NullString{
				String: res.Bio,
				Valid:  true,
			},
			ID: userID,
		})
	} else if res.Target == "date" {
		err = cfg.database.UpdateUserDateOfBirth(r.Context(), database.UpdateUserDateOfBirthParams{
			Dateofbirth: sql.NullTime{
				Time:  res.Date,
				Valid: true,
			},
			ID: userID,
		})
	} else if res.Target == "email" && res.Email != "" {
		err = cfg.database.UpdateUserEmail(r.Context(), database.UpdateUserEmailParams{
			Email: res.Email,
			ID:    userID,
		})
	} else {
		writeJSONError(w, http.StatusBadRequest, "profileCreationBadRequest", err)
		return
	}

	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	w.WriteHeader(http.StatusOK)
}
