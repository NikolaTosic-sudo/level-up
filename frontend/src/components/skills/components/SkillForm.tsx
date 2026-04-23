import { Col, Divider, Flex, Form, Input, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import SkillRenderer from "../../profileCreation/components/SkillRenderer";
import SelectSkills from "../../profileCreation/components/SelectSkills";

type SkillFormProps = {
  skillName: string;
};

function SkillForm({ skillName }: SkillFormProps) {
  const { t } = useTranslation();

  return (
    <Form>
      <Flex justify="center">
        <Form.Item style={{ width: 280 }} rules={[{ required: true }]}>
          <Input defaultValue={skillName} />
        </Form.Item>
      </Flex>

      <Divider titlePlacement="start">
        <Typography.Title level={3}>
          {t("", { defaultValue: "Linked Skills" })}
        </Typography.Title>
      </Divider>

      <Row justify="space-between" gutter={[0, 8]}>
        <Col sm={13}>
          <Form.Item name="skills">
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
