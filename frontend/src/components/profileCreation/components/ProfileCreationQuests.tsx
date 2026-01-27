import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input } from "antd";
import { Activity } from "react";
import { useTranslation } from "react-i18next";

const ProfileCreationQuests = () => {
  const { t } = useTranslation();

  return (
    <Form.List name="quest">
      {(fields, { add, remove }) => (
        <>
          {fields.map((field, index) => (
            <Form.Item
              label={t("profileCreationTrans.formQuests.quest", {
                defaultValue: "Daily quest {{count}}",
                count: index + 1,
              })}
              required={false}
              key={field.key}
            >
              <Flex align="start" gap={8}>
                <Form.Item
                  {...field}
                  key={field.key}
                  validateTrigger={["onChange", "onBlur"]}
                  noStyle
                >
                  <Input.TextArea rows={3} placeholder={`Quest ${index + 1}`} />
                </Form.Item>
                <Activity mode={fields.length > 1 ? "visible" : "hidden"}>
                  <MinusCircleOutlined
                    onClick={() => remove(field.name)}
                    style={{ fontSize: 20 }}
                  />
                </Activity>
              </Flex>
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
  );
};

export default ProfileCreationQuests;
