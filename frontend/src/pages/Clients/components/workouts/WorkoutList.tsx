import { ConfigProvider, Segmented } from "antd";
import WorkoutCard from "./WorkoutCard";
import styles from "./workouts.module.css";
import { useState } from "react";

const options = [
  { label: "Будущие", value: "future" },
  { label: "Прошедшие", value: "past" },
];

const WorkputList = () => {
  const [value, setValue] = useState<string | number>("past");
  
  return (
    <div className={styles.blockContainer}>
      <h3 className={styles.blockTitle}>Тренировки:</h3>
      <ConfigProvider
        theme={{
          components: {
            Segmented: {
              itemSelectedBg: "#3B887B",
            },
          },
        }}
      >
        <Segmented
          options={options}
          value={value}
          size="large"
          onChange={setValue}
          style={{ marginBottom: "20px" }}
        />
      </ConfigProvider>
      <ul>
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
      </ul>
    </div>
  );
};

export default WorkputList;
