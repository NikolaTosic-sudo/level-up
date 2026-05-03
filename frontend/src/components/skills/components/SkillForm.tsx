import {
  Col,
  Divider,
  Flex,
  Form,
  Progress,
  Row,
  Tooltip,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import SkillRenderer from "../../profileCreation/components/SkillRenderer";
import SelectSkills from "../../profileCreation/components/SelectSkills";
import type { Skill } from "./SkillModal";

type SkillFormProps = {
  skill: Skill;
};

function SkillForm({ skill }: SkillFormProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Flex className="skill-form" align="center">
        <Typography.Title level={3}>{skill?.name}</Typography.Title>
        <>
          <Tooltip
            title={`${skill.experience} / ${skill.experienceNeeded} exp - level ${skill.level}`}
            style={{ display: "flex" }}
          >
            <Progress
              showInfo={false}
              percent={(skill.experience / skill.experienceNeeded) * 100}
              strokeColor="#008c95"
              style={{ minWidth: 100 }}
            />
            <span style={{ marginLeft: 6, color: "white" }}>
              {skill.level} {t("skill.form.level", { defaultValue: "Level" })}
            </span>
          </Tooltip>
        </>
      </Flex>

      <Divider titlePlacement="start">
        <Typography.Title level={3}>
          {t("skill.form.linked", { defaultValue: "Linked Skills" })}
        </Typography.Title>
      </Divider>

      <Row justify="space-between" gutter={[0, 8]}>
        <Col sm={13}>
          <Form.Item name="skills" initialValue={skill?.linkedSkills}>
            <SkillRenderer vertical={false} wrap />
          </Form.Item>
        </Col>

        <Col sm={10}>
          <SelectSkills marginLeft={0} />
        </Col>
      </Row>
    </Form>
  );
}

export default SkillForm;
