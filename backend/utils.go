package main

import (
	"context"

	"github.com/NikolaTosic-sudo/level-up/backend/internal/database"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type CalculateExperienceParams struct {
	need int32
	have int32
	lvl  int32
	gain int32
}

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
		ParentQuestID: pgtype.Int8{
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

func calculateExperience(info CalculateExperienceParams) (int32, int32, int32) {
	var newExperience int32

	need := info.need
	have := info.have
	lvl := info.lvl
	gain := info.gain

	if have+gain < need {
		newExperience = have + gain
	}

	for have+gain >= need {
		newExperience = have + gain - need
		lvl += 1
		// TODO: Update the need once I have some logic behind it :)
		gain -= (need - have)
		need += DEFAULT_EXPERIENCE_NEEDED_INCREASE
		have = 0
	}

	return newExperience, lvl, need
}
