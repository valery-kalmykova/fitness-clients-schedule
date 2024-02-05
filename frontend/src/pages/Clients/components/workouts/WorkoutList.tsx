import { ConfigProvider, Segmented } from "antd";
import WorkoutCard from "./WorkoutCard";
import styles from "./workouts.module.css";
import { useEffect, useState } from "react";
import { Event } from "../../../../utils/types";

const options = [
  { label: "Будущие", value: "future" },
  { label: "Прошедшие", value: "past" },
];

interface Props {
  workoutList: []
}

const WorkputList = ({workoutList}: Props) => {
  const [value, setValue] = useState<string | number>("past");
  const [pastWorkouts, setPastWorkouts] = useState<Event[]| null>(null);
  const [futureWorkouts, setFutureWorkouts] = useState<Event[]| null>(null);

  useEffect(() => {
    const past = workoutList.filter((el: Event) => {
      return new Date(el.startDate) < new Date()
    });
    setPastWorkouts(past)
    const future = workoutList.filter((el: Event) => {
      return new Date(el.startDate) > new Date()
    });
    setFutureWorkouts(future)
  }, [workoutList])
  
  return (
    <div className={styles.flexColumn}>
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
          style={{ marginBottom: "20px", width: "fit-content" }}
        />
      </ConfigProvider>
      <ul>
        {value === "past" && pastWorkouts && pastWorkouts.map((el: any) => {
          return <WorkoutCard event={el} key={el.id} />
        })}
        {value === "future" && futureWorkouts && futureWorkouts!.map((el: any) => {
          return <WorkoutCard event={el} key={el.id} />
        })}
      </ul>
    </div>
  );
};

export default WorkputList;
