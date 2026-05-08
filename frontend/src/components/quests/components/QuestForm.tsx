import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  Space,
  Typography,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import SkillRenderer from "../../profileCreation/components/SkillRenderer";
import SelectSkills from "../../profileCreation/components/SelectSkills";
import type { Quest } from "./Quest";
import SelectRepeat from "./SelectRepeat";

type QuestFormProps = {
  initialValue?: Quest;
};

function QuestForm({ initialValue }: QuestFormProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical" initialValues={initialValue}>
      <Form.Item
        name="type"
        label={t("quest.form.group", { defaultValue: "Repeats" })}
        rules={[
          {
            required: true,
            message: t("quest.form.group.required", {
              defaultValue: "Choose where this quest should repeat.",
            }),
          },
        ]}
        style={{ maxWidth: 380 }}
      >
        <SelectRepeat />
      </Form.Item>

      <Flex gap={16} align="start">
        <Form.Item
          name="title"
          label={t("quest.form.title", { defaultValue: "Title" })}
          rules={[
            {
              required: true,
              whitespace: true,
              message: t("quest.form.title.required", {
                defaultValue: "Quest title is required.",
              }),
            },
          ]}
          style={{ flex: 1 }}
        >
          <Input
            placeholder={t("quest.form.title.placeholder", {
              defaultValue: "Enter quest title",
            })}
          />
        </Form.Item>

        <Form.Item
          name="experience"
          label={t("quest.form.experience", { defaultValue: "Experience" })}
          rules={[
            {
              required: true,
              message: t("quest.form.experience.required", {
                defaultValue: "Experience is required.",
              }),
            },
          ]}
        >
          <InputNumber min={0} style={{ width: 140 }} />
        </Form.Item>
      </Flex>

      <Divider titlePlacement="start">
        <Typography.Title level={4}>
          {t("quest.form.skills", { defaultValue: "Skills" })}
        </Typography.Title>
      </Divider>

      <Flex gap={24} align="start" wrap>
        <Form.Item name="skills" style={{ flex: 1, minWidth: 260 }}>
          <SkillRenderer vertical={false} wrap />
        </Form.Item>
        <SelectSkills marginLeft={0} />
      </Flex>

      <Divider titlePlacement="start">
        <Typography.Title level={4}>
          {t("quest.form.subquests", { defaultValue: "Sub-quests" })}
        </Typography.Title>
      </Divider>

      <Form.List name="subQuests">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Space
                key={field.key}
                align="start"
                style={{ display: "flex", width: "100%", marginBottom: 12 }}
              >
                <Form.Item name={[field.name, "id"]} hidden />

                <Form.Item
                  name={[field.name, "title"]}
                  label={t("quest.form.subquestTitle", {
                    defaultValue: "Sub-quest {{count}}",
                    count: index + 1,
                  })}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: t("quest.form.subquestTitle.required", {
                        defaultValue: "Sub-quest title is required.",
                      }),
                    },
                  ]}
                  style={{ minWidth: 380, flex: 1 }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={[field.name, "experience"]}
                  label={t("quest.form.experience", {
                    defaultValue: "Experience",
                  })}
                  rules={[
                    {
                      required: true,
                      message: t("quest.form.experience.required", {
                        defaultValue: "Experience is required.",
                      }),
                    },
                  ]}
                >
                  <InputNumber min={0} style={{ width: 120 }} />
                </Form.Item>

                <Button
                  danger
                  ghost
                  icon={<MinusCircleOutlined />}
                  onClick={() => remove(field.name)}
                  style={{ marginTop: 30 }}
                />
              </Space>
            ))}

            <Form.Item>
              <Button
                type="primary"
                ghost
                onClick={() => add({ experience: 0 })}
                icon={<PlusOutlined />}
              >
                {t("quest.form.subquests.add", {
                  defaultValue: "Add sub-quest",
                })}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
}

export default QuestForm;
