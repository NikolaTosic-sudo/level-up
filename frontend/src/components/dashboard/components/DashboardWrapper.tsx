import { Col, Row } from "antd";
import ProfileCard from "./ProfileCard";
import QuestsCard from "./QuestsCard";
import SkillsCard from "./SkillsCard";
import BioCard from "./BioCard";
import ActivityCard from "./ActivityCard";

function DashboardWrapper() {
  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <ProfileCard />
      </Col>

      <Col span={8}>
        <QuestsCard />
      </Col>

      <Col span={8}>
        <SkillsCard />
      </Col>

      <Col span={8}>
        <BioCard />
      </Col>

      <Col span={16}>
        <ActivityCard />
      </Col>
    </Row>
  );
}

export default DashboardWrapper;
