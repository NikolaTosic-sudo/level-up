package main

import (
	"context"
	"database/sql"

	"github.com/NikolaTosic-sudo/level-up/backend/internal/database"
	"github.com/google/uuid"
)

func (cfg *appConfig) getQuestSkills(userID uuid.UUID, questID int64) ([]QuestsSkills, error) {
	var res []QuestsSkills

	questSkills, err := cfg.database.GetQuestSkills(context.Background(), database.GetQuestSkillsParams{
		UserID:  userID,
		QuestID: questID,
	})
	if err != nil {
		return []QuestsSkills{}, err
	}

	if len(questSkills) > 0 {
		for _, qS := range questSkills {
			res = append(res, QuestsSkills{
				ID:   int64(qS.SkillID),
				Name: qS.Name,
			})
		}
	}

	return res, nil
}

func (cfg *appConfig) getSubQuests(userID uuid.UUID, questID int64) ([]RepeatingQuest, error) {
	var res []RepeatingQuest

	subQuests, err := cfg.database.GetSubQuests(context.Background(), database.GetSubQuestsParams{
		UserID: userID,
		ParentQuestID: sql.NullInt64{
			Int64: questID,
			Valid: true,
		},
	})
	if err != nil {
		return []RepeatingQuest{}, err
	}

	if len(subQuests) > 0 {
		for _, sQ := range subQuests {
			res = append(res, RepeatingQuest{
				ID:         sQ.ID,
				Type:       sQ.Type.String,
				Name:       sQ.Name,
				Experience: sQ.Experience.Int32,
				Completed:  sQ.Completed.Bool,
			})
		}
	}

	return res, nil
}

func (cfg *appConfig) createRepeatingQuests(r []database.GetUsersRepeatingQuestsRow, userID uuid.UUID) ([]TypeRepeatingQuest, error) {
	var res []TypeRepeatingQuest

	var current TypeRepeatingQuest

	for i, q := range r {
		subQ, err := cfg.getSubQuests(userID, q.ID)
		if err != nil {
			return []TypeRepeatingQuest{}, err
		}

		questS, err := cfg.getQuestSkills(userID, q.ID)
		if err != nil {
			return []TypeRepeatingQuest{}, err
		}

		repeatingQuest := RepeatingQuest{
			ID:                 q.ID,
			Type:               q.Type.String,
			Name:               q.Name,
			Experience:         q.Experience.Int32,
			Completed:          q.Completed.Bool,
			SubQuests:          subQ,
			SubQuestsCompleted: int(q.CompletedSubQuests),
			Skills:             questS,
		}

		if current.Type == "" {
			current = TypeRepeatingQuest{
				Type:   q.Type.String,
				Quests: []RepeatingQuest{repeatingQuest},
			}

			if i == len(r)-1 {
				res = append(res, current)
			}
		} else if current.Type == q.Type.String {
			current.Quests = append(current.Quests, repeatingQuest)

			if i == len(r)-1 {
				res = append(res, current)
			}
		} else if current.Type != q.Type.String {
			res = append(res, current)
			current = TypeRepeatingQuest{
				Type:   q.Type.String,
				Quests: []RepeatingQuest{repeatingQuest},
			}

			if i == len(r)-1 {
				res = append(res, current)
			}
		}
	}

	return res, nil
}
