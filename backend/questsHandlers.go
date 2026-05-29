package main

import (
	"database/sql"
	"encoding/json"
	"io"
	"net/http"
	"slices"
	"strconv"
	"time"

	"github.com/NikolaTosic-sudo/level-up/backend/internal/database"
)

type QuestsSkills struct {
	ID   int64  `json:"id" binding:"required"`
	Name string `json:"name" binding:"required"`
}

type RepeatingQuest struct {
	ID                 int64            `json:"id"`
	Type               string           `json:"type" binding:"required"`
	Name               string           `json:"name"`
	Experience         int32            `json:"experience"`
	Completed          bool             `json:"completed"`
	SubQuestsCompleted int              `json:"subQuestsCompleted"`
	SubQuests          []RepeatingQuest `json:"subQuests"`
	Skills             []QuestsSkills   `json:"skills"`
}

type CustomQuest struct {
	ID                 int64            `json:"id"`
	Type               string           `json:"type" binding:"required"`
	Name               string           `json:"name"`
	Experience         int32            `json:"experience"`
	Completed          bool             `json:"completed"`
	StartDate          time.Time        `json:"start_date"`
	EndDate            time.Time        `json:"end_date"`
	SubQuestsCompleted int              `json:"subQuestsCompleted"`
	SubQuests          []RepeatingQuest `json:"subQuests"`
	Skills             []QuestsSkills   `json:"skills"`
}

type TypeRepeatingQuest struct {
	Type   string           `json:"type" binding:"required"`
	Quests []RepeatingQuest `json:"quests"`
}

type QuestsReponse struct {
	RepeatingQuests []TypeRepeatingQuest `json:"repeatingQuests"`
	CustomQuests    []CustomQuest        `json:"customQuests"`
}

type QuestCreationPayload struct {
	ID         int64                  `json:"id"`
	Name       string                 `json:"name"`
	Type       string                 `json:"type"`
	Experience int32                  `json:"experience"`
	StartDate  time.Time              `json:"startDate"`
	EndDate    time.Time              `json:"endDate"`
	Skills     []SkillCreationPayload `json:"skills"`
	SubQuests  []RepeatingQuest       `json:"subQuests"`
}

// @Tags Quests
// @Summary Get all quests for the user
// @Produce json
// @Success 200 {object} QuestsReponse
// @Router /v1/levelup_api/quests [get]
func (cfg *appConfig) getUsersQuests(w http.ResponseWriter, r *http.Request) {
	userID, err := cfg.getUserId(r)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	rQ, err := cfg.database.GetUsersRepeatingQuests(r.Context(), userID)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	cQ, err := cfg.database.GetUsersCustomQuests(r.Context(), userID)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	repeatQ, err := cfg.createRepeatingQuests(rQ, userID)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	var customQ []CustomQuest

	for _, q := range cQ {
		subQ, err := cfg.getSubQuests(userID, q.ID)
		if err != nil {
			writeJSONError(w, http.StatusInternalServerError, "error", err)
			return
		}

		questS, err := cfg.getQuestSkills(userID, q.ID)
		if err != nil {
			writeJSONError(w, http.StatusInternalServerError, "error", err)
			return
		}

		customQ = append(customQ, CustomQuest{
			ID:                 q.ID,
			Type:               q.Type.String,
			Name:               q.Name,
			Experience:         q.Experience.Int32,
			Completed:          q.Completed.Bool,
			StartDate:          q.StartDate.Time,
			EndDate:            q.EndDate.Time,
			SubQuestsCompleted: int(q.CompletedSubQuests),
			SubQuests:          subQ,
			Skills:             questS,
		})
	}

	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(QuestsReponse{
		RepeatingQuests: repeatQ,
		CustomQuests:    customQ,
	})
}

// @Tags Quests
// @Summary Get all quests for the user
// @Accept json
// @Produce json
// @Success 200
// @Param body body QuestCreationPayload true "Skill creation"
// @Router /v1/levelup_api/user/quest-creation [post]
func (cfg *appConfig) questCreation(w http.ResponseWriter, r *http.Request) {
	var body QuestCreationPayload

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

	questID := body.ID

	if questID == 0 {
		questID, err = cfg.database.CreateQuest(r.Context(), database.CreateQuestParams{
			UserID: userID,
			Name:   body.Name,
			Experience: sql.NullInt32{
				Int32: body.Experience,
				Valid: true,
			},
			Type: sql.NullString{
				String: body.Type,
				Valid:  true,
			},
			StartDate: sql.NullTime{
				Time:  body.StartDate,
				Valid: true,
			},
			EndDate: sql.NullTime{
				Time:  body.EndDate,
				Valid: true,
			},
		})
		if err != nil {
			writeJSONError(w, http.StatusInternalServerError, "error", err)
			return
		}

		for _, q := range body.SubQuests {
			err = cfg.database.CreateSubQuest(r.Context(), database.CreateSubQuestParams{
				ParentQuestID: sql.NullInt64{
					Int64: questID,
					Valid: true,
				},
				UserID: userID,
				Name:   q.Name,
				Experience: sql.NullInt32{
					Int32: q.Experience,
					Valid: true,
				},
			})
			if err != nil {
				writeJSONError(w, http.StatusInternalServerError, "error", err)
				return
			}
		}
	} else {
		err = cfg.database.UpdateQuest(r.Context(), database.UpdateQuestParams{
			ID:   questID,
			Name: body.Name,
			Type: sql.NullString{
				String: body.Type,
				Valid:  true,
			},
			Experience: sql.NullInt32{
				Int32: body.Experience,
				Valid: true,
			},
			StartDate: sql.NullTime{
				Time:  body.StartDate,
				Valid: true,
			},
			EndDate: sql.NullTime{
				Time:  body.EndDate,
				Valid: true,
			},
		})
		if err != nil {
			writeJSONError(w, http.StatusInternalServerError, "error", err)
			return
		}

		err = cfg.database.DeleteQuestSkills(r.Context(), database.DeleteQuestSkillsParams{
			UserID:  userID,
			QuestID: questID,
		})
		if err != nil {
			writeJSONError(w, http.StatusInternalServerError, "error", err)
			return
		}

		subQuestsIds, err := cfg.database.GetSubQuestsIDs(r.Context(), sql.NullInt64{
			Int64: questID,
			Valid: true,
		})
		if err != nil {
			writeJSONError(w, http.StatusInternalServerError, "error", err)
			return
		}

		for _, q := range body.SubQuests {
			if slices.Contains(subQuestsIds, q.ID) {
				err = cfg.database.UpdateQuest(r.Context(), database.UpdateQuestParams{
					ID:   q.ID,
					Name: q.Name,
					Experience: sql.NullInt32{
						Int32: q.Experience,
						Valid: true,
					},
				})
				if err != nil {
					writeJSONError(w, http.StatusInternalServerError, "error", err)
					return
				}

				idx := slices.Index(subQuestsIds, q.ID)

				subQuestsIds = slices.Delete(subQuestsIds, idx, idx+1)

			} else if q.ID == 0 {
				err = cfg.database.CreateSubQuest(r.Context(), database.CreateSubQuestParams{
					Name: q.Name,
					Experience: sql.NullInt32{
						Int32: q.Experience,
						Valid: true,
					},
					UserID: userID,
					ParentQuestID: sql.NullInt64{
						Int64: questID,
						Valid: true,
					},
				})
				if err != nil {
					writeJSONError(w, http.StatusInternalServerError, "error", err)
					return
				}
			}
		}

		if len(subQuestsIds) > 0 {
			for _, q := range subQuestsIds {
				err = cfg.database.DeleteSubQuest(r.Context(), database.DeleteSubQuestParams{
					UserID: userID,
					ID:     q,
				})
				if err != nil {
					writeJSONError(w, http.StatusInternalServerError, "error", err)
					return
				}
			}
		}
	}

	for _, s := range body.Skills {
		skillId := s.ID

		if s.IsNew {
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

		err = cfg.database.CreateQuestSkills(r.Context(), database.CreateQuestSkillsParams{
			QuestID: questID,
			UserID:  userID,
			SkillID: skillId,
		})
		if err != nil {
			writeJSONError(w, http.StatusInternalServerError, "error", err)
			return
		}
	}

	w.WriteHeader(http.StatusOK)
}

// @Tags Quests
// @Summary Complete a sub-quest
// @Success 200
// @Param id path int true "ID of the quest"
// @Router /v1/levelup_api/user/quest/{id}/complete-subquest [post]
func (cfg *appConfig) completeSubQuest(w http.ResponseWriter, r *http.Request) {
	userID, err := cfg.getUserId(r)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	questIDStr := r.PathValue("id")

	questID, err := strconv.Atoi(questIDStr)
	if err != nil {
		writeJSONError(w, http.StatusBadRequest, "wrongIdDeactivate", err)
		return
	}

	quest, err := cfg.database.CompleteQuest(r.Context(), database.CompleteQuestParams{
		ID:     int64(questID),
		UserID: userID,
	})
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	user, err := cfg.database.GetUsersExperience(r.Context(), userID)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	if quest.Valid {
		var newExperience int32

		need := user.ExperienceNeeded.Int32
		have := user.Experience.Int32
		lvl := user.Level.Int32
		gain := quest.Int32

		if have+gain < need {
			newExperience = have + gain
		} else if have+gain >= need {
			newExperience = have + gain - need
			lvl += 1
			// TODO: Update the need once I have some logic behind it :)
			need += 100
		}

		err = cfg.database.UpdateUsersExperience(r.Context(), database.UpdateUsersExperienceParams{
			ID: userID,
			Experience: sql.NullInt32{
				Int32: newExperience,
				Valid: true,
			},
			Level: sql.NullInt32{
				Int32: lvl,
				Valid: true,
			},
			ExperienceNeeded: sql.NullInt32{
				Int32: need,
				Valid: true,
			},
		})
		if err != nil {
			writeJSONError(w, http.StatusInternalServerError, "error", err)
			return
		}
	}

	w.WriteHeader(http.StatusOK)
}

// @Tags Quests
// @Summary Delete a sub-quest
// @Success 200
// @Param id path int true "ID of the quest"
// @Router /v1/levelup_api/user/quest/{id}/delete-subquest [delete]
func (cfg *appConfig) deleteSubQuest(w http.ResponseWriter, r *http.Request) {
	userID, err := cfg.getUserId(r)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	questIDStr := r.PathValue("id")

	questID, err := strconv.Atoi(questIDStr)
	if err != nil {
		writeJSONError(w, http.StatusBadRequest, "wrongIdDeactivate", err)
		return
	}

	err = cfg.database.DeleteSubQuest(r.Context(), database.DeleteSubQuestParams{
		ID:     int64(questID),
		UserID: userID,
	})
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	w.WriteHeader(http.StatusOK)
}
