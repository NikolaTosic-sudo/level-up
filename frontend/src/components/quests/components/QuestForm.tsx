import {
  Button,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  Space,
  Typography,
  type FormInstance,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import SkillRenderer from "../../profileCreation/components/SkillRenderer";
import SelectSkills from "../../profileCreation/components/SelectSkills";
import SelectRepeat from "./SelectRepeat";
import HelperComponent from "../../common/HelperComponent";
import dayjs from "dayjs";
import type { MainCustomQuest, MainRepeatingQuest } from "../../../api";

type QuestFormProps = {
  formInstance: FormInstance;
  initialValue?: MainRepeatingQuest | MainCustomQuest;
  custom?: boolean;
};

function QuestForm({ formInstance, initialValue, custom }: QuestFormProps) {
  const { t } = useTranslation();

  return (
    <Form form={formInstance} layout="vertical" initialValues={initialValue}>
      {custom || initialValue?.type === "custom" ? (
        <Form.Item initialValue="custom" name="type" hidden />
      ) : (
        <Form.Item
          name="type"
          label={t("quest.form.repeats", { defaultValue: "Repeats" })}
          rules={[
            {
              required: true,
              message: t("quest.form.required.repeats", {
                defaultValue: "Choose where this quest should repeat.",
              }),
            },
          ]}
          style={{ maxWidth: 380 }}
        >
          <SelectRepeat />
        </Form.Item>
      )}

      <Flex gap={16} align="start">
        <Form.Item
          name="name"
          label={t("quest.form.title", { defaultValue: "Title" })}
          rules={[
            {
              required: true,
              whitespace: true,
              message: t("quest.form.required.title", {
                defaultValue: "Quest title is required.",
              }),
            },
          ]}
          style={{ flex: 1 }}
        >
          <Input
            placeholder={t("quest.form.placeholder.title", {
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
              message: t("quest.form.required.experience", {
                defaultValue: "Experience is required.",
              }),
            },
          ]}
        >
          <InputNumber min={0} style={{ width: 140 }} />
        </Form.Item>
      </Flex>

      {custom || initialValue?.type === "custom" ? (
        <Flex gap={24} align="end">
          <Form.Item
            name="startDate"
            label={t("quest.form.startDate", { defaultValue: "Start date" })}
            rules={[
              {
                required: true,
                message: t("quest.form.required.startDate", {
                  defaultValue: "Choose the start date for this quest",
                }),
              },
            ]}
            style={{ maxWidth: 380 }}
            getValueProps={(value) => ({
              value: value ? dayjs(value, "YYYY-MM-DD") : null,
            })}
            normalize={(value) =>
              value ? dayjs(value).format("YYYY-MM-DD") : null
            }
          >
            <DatePicker
              placeholder={t("quest.form.placeholder.startDate", {
                defaultValue: "Start date",
              })}
            />
          </Form.Item>

          <Form.Item
            name="endDate"
            label={t("quest.form.endDate", { defaultValue: "End date" })}
            style={{ maxWidth: 380 }}
            getValueProps={(value) => ({
              value: value ? dayjs(value, "YYYY-MM-DD") : null,
            })}
            normalize={(value) =>
              value ? dayjs(value).format("YYYY-MM-DD") : null
            }
          >
            <DatePicker
              placeholder={t("quest.form.placeholder.endDate", {
                defaultValue: "End date",
              })}
            />
          </Form.Item>
        </Flex>
      ) : null}

      <Divider titlePlacement="start">
        <Typography.Title level={4}>
          {t("quest.form.skills", { defaultValue: "Skills" })}
        </Typography.Title>
      </Divider>

      <Flex gap={24} align="start" wrap>
        <Form.Item name="skills" style={{ flex: 1, minWidth: 260 }}>
          <SkillRenderer vertical={false} wrap />
        </Form.Item>
        <SelectSkills mode="excludeSelectedUsersSkills" marginLeft={0} />
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
                  name={[field.name, "name"]}
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
                  label={
                    <>
                      {t("quest.form.experience", {
                        defaultValue: "Experience",
                      })}
                      <HelperComponent text="Part of overall quest experience" />
                    </>
                  }
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
                onClick={() => add()}
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
