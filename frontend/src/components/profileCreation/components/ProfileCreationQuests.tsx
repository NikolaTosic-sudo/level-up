import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, InputNumber } from "antd";
import { useTranslation } from "react-i18next";

const ProfileCreationQuests = () => {
  const { t } = useTranslation();

  return (
    <div className="profile-creation-main">
      <Form.List name="quests">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                label={t("profileCreationTrans.formQuests.quest", {
                  defaultValue: "Daily quest {{count}}",
                  count: index + 1,
                })}
                key={field.key}
              >
                <Flex align="start" gap={8}>
                  <Form.Item
                    {...field}
                    key={field.key}
                    name={[field.name, "name"]}
                    validateTrigger={["onChange", "onBlur"]}
                    noStyle
                  >
                    <Input.TextArea
                      rows={3}
                      placeholder={`Quest ${index + 1}`}
                    />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => remove(field.name)}
                    style={{ fontSize: 20, color: "white" }}
                  />
                </Flex>

                <Form.Item
                  name={[field.name, "experience"]}
                  label={t("quest.form.experience", {
                    defaultValue: "Experience for daily quest {{count}}",
                    count: index + 1,
                  })}
                  style={{ marginTop: 24 }}
                >
                  <InputNumber
                    defaultValue={0}
                    min={0}
                    style={{ width: 140 }}
                  />
                </Form.Item>
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="primary"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                {t("profileCreationTrans.formQuests.add", "Add quest")}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default ProfileCreationQuests;
