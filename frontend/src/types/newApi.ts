import {
  Configuration,
  LoginApi,
  PlayerApi,
  QuestsApi,
  SkillsApi,
} from "../api";

export const apiConfig = new Configuration({
  basePath: "http://localhost:8080",
  credentials: "include",
});

export const playerApi = new PlayerApi(apiConfig);

export const skillsApi = new SkillsApi(apiConfig);

export const loginApi = new LoginApi(apiConfig);

export const questsApi = new QuestsApi(apiConfig);
