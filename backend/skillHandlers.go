package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

type SkillsResponse struct {
	Skills []string `json:"skills"`
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
