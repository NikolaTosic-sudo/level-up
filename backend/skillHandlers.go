package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/NikolaTosic-sudo/level-up/backend/internal/database"
)

type Skill struct {
	Name             string      `json:"name" binding:"required"`
	Experience       int32       `json:"experience"`
	ExperienceNeeded int32       `json:"experience_needed"`
	Level            int32       `json:"level"`
	LinkedSkills     interface{} `json:"LinkedSkills"`
}

type UsersSkillsResponse struct {
	Skills []Skill `json:"skills"`
}

type SkillsResponse struct {
	Skills []database.GetSkillsByNameRow `json:"skills"`
}

// @Tags Skills
// @Summary Get skills from database
// @Description get skills, limited to 200 results
// @Produce json
// @Success 200 {object} SkillsResponse
// @Param name query string false "Get skills with the typed in prefix"
// @Router /v1/levelup_api/skills [get]
func (cfg *appConfig) getSkillsHandler(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	name, exists := query["name"]

	reqName := ""

	if exists {
		reqName = name[0]
	}

	fullReq := strings.Join([]string{reqName, "%"}, "")

	skills, err := cfg.database.GetSkillsByName(context.Background(), fullReq)
	if err != nil {
		fmt.Println(err)
	}

	resp := SkillsResponse{
		Skills: skills,
	}

	response, err := json.Marshal(resp)
	if err != nil {
		fmt.Println(err)
	}

	_, err = w.Write(response)
	if err != nil {
		fmt.Println(err)
	}
}

// @Tags Skills
// @Summary Get skills from database
// @Description get skills, limited to 200 results
// @Produce json
// @Success 200 {object} UsersSkillsResponse
// @Router /v1/levelup_api/user/skills [get]
func (cfg *appConfig) getUsersSkillsHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := cfg.getUserId(r)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	skills, err := cfg.database.GetUsersSkills(r.Context(), userID)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	s := []Skill{}

	for _, sk := range skills {
		s = append(s, Skill{
			Name:             sk.Name,
			Experience:       sk.Experience,
			ExperienceNeeded: sk.ExperienceNeeded,
			Level:            sk.Level,
		})
	}

	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(UsersSkillsResponse{
		Skills: s,
	})
}
