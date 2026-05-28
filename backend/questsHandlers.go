package main

import (
	"encoding/json"
	"net/http"
	"time"
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
