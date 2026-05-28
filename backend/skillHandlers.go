package main

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
	"strconv"
	"strings"

	"github.com/NikolaTosic-sudo/level-up/backend/internal/database"
)

type Skill struct {
	ID               int32         `json:"id"`
	Name             string        `json:"name" binding:"required"`
	Experience       int32         `json:"experience"`
	ExperienceNeeded int32         `json:"experienceNeeded"`
	Level            int32         `json:"level"`
	LinkedSkills     []LinkedSkill `json:"linkedSkills"`
}

type LinkedSkill struct {
	ID   int32  `json:"id"`
	Name string `json:"name" binding:"required"`
}

type SkillCreationPayload struct {
	ID           int32         `json:"id"`
	Name         string        `json:"name" binding:"required"`
	IsNew        bool          `json:"isNew"`
	LinkedSkills []LinkedSkill `json:"linkedSkills"`
}

type SkillExclude struct {
	ID           int32         `json:"id" binding:"required"`
	Name         string        `json:"name" binding:"required"`
	LinkedSkills []LinkedSkill `json:"linkedSkills"`
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

type SkillsNotOwnedResponse struct {
	Skills []database.GetSkillsNotOwnedByUserRow `json:"skills"`
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
		var linkedSkills []LinkedSkill

		err = json.Unmarshal([]byte(sk.LinkedSkills), &linkedSkills)
		if err != nil {
			writeJSONError(w, http.StatusInternalServerError, "error", err)
			return
		}

		s = append(s, Skill{
			ID:               sk.SkillID,
			Name:             sk.Name,
			Experience:       sk.Experience,
			ExperienceNeeded: sk.ExperienceNeeded,
			Level:            sk.Level,
			LinkedSkills:     linkedSkills,
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

// @Tags Skills
// @Summary Create skill
// @Description create skill for user
// @Accept json
// @Success 200
// @Param body body SkillCreationPayload true "Skill creation"
// @Router /v1/levelup_api/create-skill [post]
func (cfg *appConfig) skillEditHandler(w http.ResponseWriter, r *http.Request) {
	var body SkillCreationPayload

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

	if body.Name == "" {
		writeJSONError(w, http.StatusBadRequest, "editSkillBadRequest", err)
		return
	}

	if body.IsNew {
		skillId, err := cfg.database.CreateSkill(r.Context(), body.Name)
		if err != nil {
			writeJSONError(w, http.StatusInternalServerError, "error", err)
			return
		}

		err = cfg.database.CreateUsersSkills(r.Context(), database.CreateUsersSkillsParams{
			UserID:  userID,
			SkillID: skillId,
			Name:    body.Name,
		})
		if err != nil {
			writeJSONError(w, http.StatusInternalServerError, "error", err)
			return
		}

		for _, lS := range body.LinkedSkills {
			sID := lS.ID

			if sID == 0 {
				sID, err = cfg.database.CreateSkill(r.Context(), lS.Name)
				if err != nil {
					writeJSONError(w, http.StatusInternalServerError, "error", err)
					return
				}

				err = cfg.database.CreateUsersSkills(r.Context(), database.CreateUsersSkillsParams{
					UserID:  userID,
					SkillID: sID,
					Name:    lS.Name,
				})
				if err != nil {
					writeJSONError(w, http.StatusInternalServerError, "error", err)
					return
				}
			}

			err = cfg.database.UpsertLinkedSkills(r.Context(), database.UpsertLinkedSkillsParams{
				UserID:        userID,
				ParentSkillID: skillId,
				Column3:       []int32{sID},
			})
			if err != nil {
				writeJSONError(w, http.StatusInternalServerError, "error", err)
				return
			}

			w.WriteHeader(http.StatusOK)
		}
	} else {
		var linkedIds []int32

		for _, sk := range body.LinkedSkills {
			linkedIds = append(linkedIds, sk.ID)
		}

		err = cfg.database.DeactivateRemovedLinkedSkills(r.Context(), database.DeactivateRemovedLinkedSkillsParams{
			UserID:        userID,
			ParentSkillID: body.ID,
			Column3:       linkedIds,
		})
		if err != nil {
			writeJSONError(w, http.StatusInternalServerError, "error", err)
			return
		}

		err = cfg.database.UpsertLinkedSkills(r.Context(), database.UpsertLinkedSkillsParams{
			UserID:        userID,
			ParentSkillID: body.ID,
			Column3:       linkedIds,
		})
		if err != nil {
			writeJSONError(w, http.StatusInternalServerError, "error", err)
			return
		}

		w.WriteHeader(http.StatusOK)
	}
}

// @Tags Skills
// @Summary Get skills from database
// @Description get skills not owned by the user, limited to 200 results
// @Produce json
// @Success 200 {object} SkillsNotOwnedResponse
// @Param name query string false "Get skills with the typed in prefix and not owned by current user"
// @Router /v1/levelup_api/skills-not-user [get]
func (cfg *appConfig) getSkillsNotOwnedByUserHandler(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	name, exists := query["name"]

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

	skills, err := cfg.database.GetSkillsNotOwnedByUser(context.Background(), database.GetSkillsNotOwnedByUserParams{
		Name:   fullReq,
		UserID: userID,
	})
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	resp := SkillsNotOwnedResponse{
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

	w.WriteHeader(http.StatusOK)
}

// @Tags Skills
// @Summary Deactivate
// @Description deactivate the skill
// @Success 200
// @Param id path int true "Id of the skill"
// @Router /v1/levelup_api/skill/{id}/deactivate [delete]
func (cfg *appConfig) deactivateUsersSkill(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path

	parts := strings.Split(path, "/")

	skillIdStr := parts[4]

	skillId, err := strconv.Atoi(skillIdStr)
	if err != nil {
		writeJSONError(w, http.StatusBadRequest, "wrongIdDeactivate", err)
		return
	}

	userID, err := cfg.getUserId(r)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	err = cfg.database.SoftDeleteUserSkill(r.Context(), database.SoftDeleteUserSkillParams{
		UserID:        userID,
		ParentSkillID: int32(skillId),
	})
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "error", err)
		return
	}

	w.WriteHeader(http.StatusOK)
}
