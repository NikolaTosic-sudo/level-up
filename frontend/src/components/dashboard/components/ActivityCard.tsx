import { Card, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import CalendarHeatmap from "react-calendar-heatmap";
import dayjs from "dayjs";

function ActivityCard() {
  const { t } = useTranslation();

  return (
    <Card
      styles={{ body: { paddingBottom: 0 } }}
      title={t("dashboard.activity.title", { defaultValue: "Activity" })}
    >
      <CalendarHeatmap
        startDate={dayjs(new Date()).subtract(1, "year").toString()}
        endDate={new Date()}
        transformDayElement={(element, value) => (
          <Tooltip
            title={
              value
                ? t("dashboard.activity.tooltip", {
                    defaultValue: "{{count}} activities on {{date}}",
                    count: value["count"],
                    date: dayjs(value["date"]).format("MMM D, YYYY"),
                  })
                : null
            }
          >
            {element}
          </Tooltip>
        )}
        values={[
          {
            date: "2025-7-11",
            count: 1,
            scale: 1,
          },
          {
            date: "2025-8-11",
            count: 2,
            scale: 2,
          },
          {
            date: "2025-9-11",
            count: 3,
            scale: 3,
          },
          {
            date: "2025-10-11",
            count: 4,
            scale: 4,
          },
          {
            date: "2025-12-10",
            count: 5,
            scale: 5,
          },
          {
            date: "2025-12-11",
            count: 12,
            scale: 5,
          },
          {
            date: "2025-12-12",
            count: 76,
            scale: 5,
          },
          {
            date: "2025-12-13",
            count: 29,
            scale: 5,
          },
          {
            date: "2025-12-14",
            count: 31,
            scale: 5,
          },
        ]}
        classForValue={(value) => {
          if (!value) {
            return "activity-empty";
          }

          return `color-scale-${value["scale"]}`;
        }}
        showWeekdayLabels
      />
    </Card>
  );
}

export default ActivityCard;
