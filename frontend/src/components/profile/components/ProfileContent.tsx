import { Layout } from "antd";
import { useProfileWrapStore } from "../store/useProfileWrapStore";
import Skills from "../../skills/Skills";
import { Activity } from "react";
import Quests from "../../quests/Quests";
import Dashboard from "../../dashboard/Dashboard";

const { Content } = Layout;

function ProfileContent() {
  const { currentModule } = useProfileWrapStore();

  return (
    <Content className="profile-content">
      <Activity mode={currentModule === "dash" ? "visible" : "hidden"}>
        <Dashboard />
      </Activity>

      <Activity mode={currentModule === "skills" ? "visible" : "hidden"}>
        <Skills />
      </Activity>

      <Activity mode={currentModule === "quests" ? "visible" : "hidden"}>
        <Quests />
      </Activity>

      <Activity
        mode={
          currentModule !== "skills" &&
          currentModule !== "quests" &&
          currentModule !== "dash"
            ? "visible"
            : "hidden"
        }
      >
        Test content
      </Activity>
    </Content>
  );
}

export default ProfileContent;
