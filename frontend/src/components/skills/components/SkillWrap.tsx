import { Button, Divider, Flex, Popconfirm, Progress, Tooltip } from "antd";
import type { Skill } from "./SkillModal";
import { useHover } from "../../../hooks/useHover";
import SkillModal from "./SkillModal";
import { DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

type SkillWrapProps = {
  skill: Skill;
};

function SkillWrap({ skill }: SkillWrapProps) {
  const { t } = useTranslation();
  const { isHovered, bind } = useHover();

  return (
    <div {...bind} style={{ position: "relative" }}>
      <Flex
        className="skill-wrap"
        style={{ paddingBottom: isHovered ? 16 : 8 }}
        align="center"
      >
        <span style={{ color: "white" }}>{skill.name}</span>
        <Divider vertical style={{ marginBlock: -12 }} />
        <Tooltip
          title={`${skill.experience} / ${skill.experienceNeeded} exp - level ${skill.level}`}
          style={{ display: "flex" }}
        >
          <Progress
            showInfo={false}
            percent={(skill.experience / skill.experienceNeeded) * 100}
            strokeColor="#008c95"
            style={{ minWidth: 60 }}
          />
        </Tooltip>
        <span style={{ marginLeft: 6, color: "white" }}>{skill.level}</span>
      </Flex>

      {isHovered ? (
        <div className="skill-actions">
          <SkillModal skill={skill} />
          <Popconfirm
            title={t("skill.confirm.remove", {
              defaultValue: "Are you sure you want to remove this skill?",
            })}
            cancelButtonProps={{ danger: true, type: "primary" }}
          >
            <Tooltip
              title={t("skill.tooltip.remove", {
                defaultValue: "Remove skill",
              })}
            >
              <Button
                style={{ fontSize: 10, height: 20, width: 20 }}
                ghost
                danger
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        </div>
      ) : null}
    </div>
  );
}

export default SkillWrap;
