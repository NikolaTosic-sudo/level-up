import { Col, Row } from "antd";
import ProfileCard from "./ProfileCard";
import QuestsCard from "./QuestsCard";
import SkillsCard from "./SkillsCard";
import BioCard from "./BioCard";
import ActivityCard from "./ActivityCard";
import type { MainUserResponse } from "../../../api";

type DashboardWrapperProps = {
  user: MainUserResponse;
};

function DashboardWrapper({ user }: DashboardWrapperProps) {
  return (
    <Row gutter={[16, 16]} className="dashboard-wrap">
      <Col span={8}>
        <ProfileCard user={user.profile} />
      </Col>

      <Col span={8}>
        <QuestsCard />
      </Col>

      <Col span={8}>
        <SkillsCard />
      </Col>

      <Col span={8}>
        <BioCard bio={user.bio ?? ""} />
      </Col>

      <Col span={16}>
        <ActivityCard />
      </Col>
    </Row>
  );
}

export default DashboardWrapper;
