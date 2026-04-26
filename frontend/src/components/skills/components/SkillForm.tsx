import { Col, Divider, Flex, Form, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import SkillRenderer from "../../profileCreation/components/SkillRenderer";
import SelectSkills from "../../profileCreation/components/SelectSkills";
import type { Skill } from "./SkillModal";

type SkillFormProps = {
  skill?: Skill;
};

function SkillForm({ skill }: SkillFormProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Flex justify="center">
        <Typography.Title level={3}>{skill?.name}</Typography.Title>
      </Flex>

      <Divider titlePlacement="start">
        <Typography.Title level={3}>
          {t("", { defaultValue: "Linked Skills" })}
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
