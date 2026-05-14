import { Card } from "antd";
import { useTranslation } from "react-i18next";
import CalendarHeatmap from "react-calendar-heatmap";
import dayjs from "dayjs";

function ActivityCard() {
  const { t } = useTranslation();

  return (
    <Card title={t("", { defaultValue: "Activity" })}>
      <CalendarHeatmap
        startDate={dayjs(new Date()).subtract(1, "year").toString()}
        endDate={new Date()}
        values={[
          {
            date: "2025-7-11",
            count: 1,
          },
          {
            date: "2025-8-11",
            count: 2,
          },
          {
            date: "2025-9-11",
            count: 3,
          },
          {
            date: "2025-10-11",
            count: 4,
          },
          {
            date: "2025-12-10",
            count: 5,
          },
          {
            date: "2025-12-11",
            count: 5,
          },
          {
            date: "2025-12-12",
            count: 5,
          },
          {
            date: "2025-12-13",
            count: 5,
          },
          {
            date: "2025-12-14",
            count: 5,
          },
        ]}
        classForValue={(value) => {
          if (!value) {
            return "activity-empty";
          }

          return `color-scale-${value["count"]}`;
        }}
        showWeekdayLabels
      />
    </Card>
  );
}

export default ActivityCard;
