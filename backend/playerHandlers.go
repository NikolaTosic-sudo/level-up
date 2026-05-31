package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/NikolaTosic-sudo/level-up/backend/internal/database"
	"github.com/jackc/pgx/v5/pgtype"
)

const DEFAULT_EXPERIENCE_NEEDED_INCREASE = 100

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
	Profile                ProfileResponse    `json:"profile" binding:"required"`
	Bio                    string             `json:"bio"`
	HighestLeveledSkill    string             `json:"highestLeveledSkill"`
	MostRecentLeveledSkill string             `json:"mostRecentLeveledSkill"`
	QuestStats             QuestStatsResponse `json:"questStats"`
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

type PlayerInfoResponse struct {
	Name             string `json:"name"`
	Experience       int32  `json:"experience"`
	ExperienceNeeded int32  `json:"experienceNeeded"`
	Level            int32  `json:"level"`
	HotStreak        int32  `json:"hotStreak"`
}

type QuestStatsResponse struct {
	CompletedCount          int `json:"questCompleted"`
	RepeatingCompletedCount int `json:"repeatingQuestCompleted"`
	CustomCompletedCount    int `json:"customQuestCompleted"`
	ExperienceGained        int `json:"experienceGained"`
	SubQuestsCompletedCount int `json:"subQuestsCompleted"`
}

// @Tags Player
// @Summary Create the player
// @Description Create the player with user's info, skills and quests
// @Accept json
// @Produce json
// @Success 200 {object} LoginResponse
// @Param body body ProfileCreationBody true "Profile creation payload"
// @Router /v1/levelup_api/createProfile [post]
func (cfg *appConfig) profileCreationHandler(w http.ResponseWriter, r *http.Request, qtx *database.Queries) ErrorResponseInternal {
	var body ProfileCreationBody

	b, err := io.ReadAll(r.Body)
	if err != nil {
		return getErrorResponse(http.StatusInternalServerError, "error", err)
	}

	err = json.Unmarshal(b, &body)
	if err != nil {
		return getErrorResponse(http.StatusInternalServerError, "error", err)
	}

	userID, err := cfg.getUserId(r)
	if err != nil {
		return getErrorResponse(http.StatusInternalServerError, "error", err)
	}

	user, err := qtx.GetUserByID(r.Context(), userID)
	if err != nil {
		return getErrorResponse(http.StatusInternalServerError, "error", err)
	}

	if len(body.Quests) > 0 {
		for _, q := range body.Quests {
			_, err = qtx.CreateQuest(r.Context(), database.CreateQuestParams{
				Name: q.Name,
				Experience: pgtype.Int4{
					Int32: int32(q.Experience),
					Valid: true,
				},
				UserID: userID,
				Type: pgtype.Text{
					String: "d",
					Valid:  true,
				},
			})
			if err != nil {
				return getErrorResponse(http.StatusInternalServerError, "error", err)
			}
		}
	}

	if len(body.Skills) > 0 {
		for _, s := range body.Skills {
			skillId := int32(s.Id)

			if skillId == 0 {
				skillId, err = qtx.CreateSkill(r.Context(), s.Name)
				if err != nil {
					return getErrorResponse(http.StatusInternalServerError, "error", err)
				}
			}

			err = qtx.CreateUsersSkills(r.Context(), database.CreateUsersSkillsParams{
				UserID:  userID,
				SkillID: skillId,
				Name:    s.Name,
			})
			if err != nil {
				return getErrorResponse(http.StatusInternalServerError, "error", err)
			}
		}
	}

	err = qtx.UpdateUserProfile(r.Context(), database.UpdateUserProfileParams{
		Firstname: pgtype.Text{
			String: body.FirstName,
			Valid:  true,
		},
		Lastname: pgtype.Text{
			String: body.LastName,
			Valid:  true,
		},
		Nickname: pgtype.Text{
			String: body.Nickname,
			Valid:  true,
		},
		Dateofbirth: pgtype.Date{
			Time:  body.Date,
			Valid: true,
		},
		Bio: pgtype.Text{
			String: body.Bio,
			Valid:  true,
		},
		Email: user.Email,
	})
	if err != nil {
		return getErrorResponse(http.StatusInternalServerError, "error", err)
	}

	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(LoginResponse{
		Code:     "200",
		Redirect: "/profile",
	})

	return ErrorResponseInternal{}
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
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	mostRecentLeveled, err := cfg.database.GetMostRecentLeveledSkill(r.Context(), userID)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	questStats, err := cfg.database.GetCompletedQuestStats(r.Context(), userID)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	experienceGained := 0

	for lvl := range user.Level.Int32 {
		experienceGained += (int(lvl) + 1) * DEFAULT_EXPERIENCE_NEEDED_INCREASE
	}

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
		QuestStats: QuestStatsResponse{
			CompletedCount:          int(questStats.AllCompleted),
			RepeatingCompletedCount: int(questStats.RepeatingCompleted),
			CustomCompletedCount:    int(questStats.CustomCompleted),
			SubQuestsCompletedCount: int(questStats.SubQuestsCompleted),
			ExperienceGained:        experienceGained + int(user.Experience.Int32),
		},
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
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	err = json.Unmarshal(b, &res)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	if res.Target == "firstName" && res.FirstName != "" {
		err = cfg.database.UpdateUserFirstName(r.Context(), database.UpdateUserFirstNameParams{
			Firstname: pgtype.Text{
				String: res.FirstName,
				Valid:  true,
			},
			ID: userID,
		})
	} else if res.Target == "lastName" && res.LastName != "" {
		err = cfg.database.UpdateUserLastName(r.Context(), database.UpdateUserLastNameParams{
			Lastname: pgtype.Text{
				String: res.LastName,
				Valid:  true,
			},
			ID: userID,
		})
	} else if res.Target == "nickname" && res.Nickname != "" {
		err = cfg.database.UpdateUserNickname(r.Context(), database.UpdateUserNicknameParams{
			Nickname: pgtype.Text{
				String: res.Nickname,
				Valid:  true,
			},
			ID: userID,
		})
	} else if res.Target == "bio" {
		err = cfg.database.UpdateUserBio(r.Context(), database.UpdateUserBioParams{
			Bio: pgtype.Text{
				String: res.Bio,
				Valid:  true,
			},
			ID: userID,
		})
	} else if res.Target == "date" {
		err = cfg.database.UpdateUserDateOfBirth(r.Context(), database.UpdateUserDateOfBirthParams{
			Dateofbirth: pgtype.Date{
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

// @Tags Player
// @Summary Get player info
// @Description Get info for the header
// @Produce json
// @Success 200 {object} PlayerInfoResponse
// @Router /v1/levelup_api/user/info [get]
func (cfg *appConfig) getUserInfo(w http.ResponseWriter, r *http.Request) {
	userID, err := cfg.getUserId(r)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	userInfo, err := cfg.database.GetUserByID(r.Context(), userID)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(PlayerInfoResponse{
		Name:             fmt.Sprintf("%v %v %v", userInfo.Firstname.String, userInfo.Nickname.String, userInfo.Lastname.String),
		Experience:       userInfo.Experience.Int32,
		ExperienceNeeded: userInfo.ExperienceNeeded.Int32,
		Level:            userInfo.Level.Int32,
		HotStreak:        userInfo.HotStreak.Int32,
	})
}
