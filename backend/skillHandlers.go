package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/NikolaTosic-sudo/level-up/backend/internal/database"
)

type Skill struct {
	Name             string      `json:"name" binding:"required"`
	Experience       int32       `json:"experience"`
	ExperienceNeeded int32       `json:"experienceNeeded"`
	Level            int32       `json:"level"`
	LinkedSkills     interface{} `json:"linkedSkills"`
}

type SkillExclude struct {
	ID   int32  `json:"id" binding:"required"`
	Name string `json:"name" binding:"required"`
}

type UsersSkillsResponse struct {
	Skills []Skill `json:"skills"`
}

type SkillsResponse struct {
	Skills []database.GetSkillsByNameRow `json:"skills"`
}

type SkillsExcludeResponse struct {
	Skills []SkillExclude `json:"skills"`
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
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	resp := SkillsResponse{
		Skills: skills,
	}

	response, err := json.Marshal(resp)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	_, err = w.Write(response)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}
}

// @Tags Skills
// @Summary Get user's skills from database
// @Description get user's skills
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

// @Tags Skills
// @Summary Get user's skills from database
// @Description get user's skills
// @Produce json
// @Success 200 {object} SkillsExcludeResponse
// @Param name query string false "Get skills with the typed in prefix"
// @Param exclude_ids query []int false "Exclude skills"
// @Param excludeName query string false "Exclude given skill"
// @Router /v1/levelup_api/user/skills_exclude [get]
func (cfg *appConfig) getUsersSkillsExcludeHandler(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	name, exists := query["name"]
	excludeIdsString := query["exclude_ids"]
	excludeName, excludeExists := query["excludeName"]

	excludeIDs := make([]int32, 0, len(excludeIdsString))

	for _, idStr := range excludeIdsString {
		id, err := strconv.Atoi(idStr)
		if err != nil {
			continue
		}

		excludeIDs = append(excludeIDs, int32(id))
	}

	exName := ""
	if excludeExists {
		exName = excludeName[0]
	}

	reqName := ""

	if exists {
		reqName = name[0]
	}

	fullReq := strings.Join([]string{reqName, "%"}, "")

	userID, err := cfg.getUserId(r)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	skills, err := cfg.database.GetUsersSkillsExclude(r.Context(), database.GetUsersSkillsExcludeParams{
		UserID:  userID,
		Name:    fullReq,
		Column3: excludeIDs,
		Name_2:  exName,
	})
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	fmt.Println(skills, "skills", excludeIDs, exName)

	s := []SkillExclude{}

	for _, sk := range skills {
		s = append(s, SkillExclude{
			ID:   sk.SkillID,
			Name: sk.Name,
		})
	}

	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(SkillsExcludeResponse{
		Skills: s,
	})
}
