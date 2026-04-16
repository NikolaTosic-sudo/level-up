import { Layout } from "antd";
import { useProfileWrapStore } from "../store/useProfileWrapStore";
import Skills from "../../skills/Skills";
import { Activity } from "react";

const { Content } = Layout;

function ProfileContent() {
  const { currentModule } = useProfileWrapStore();

  return (
    <Content className="profile-content">
      <Activity mode={currentModule === "skills" ? "visible" : "hidden"}>
        <Skills />
      </Activity>

      <Activity mode={currentModule !== "skills" ? "visible" : "hidden"}>
        Test content
      </Activity>
    </Content>
  );
}

export default ProfileContent;
