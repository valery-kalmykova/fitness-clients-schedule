import WorkoutCard from "./WorkoutCard";
import styles from "./workouts.module.css";

const WorkputList = () => {
  return (
    <div className={styles.blockContainer}>
      <h3 className={styles.blockTitle}>Тренировки:</h3>
      <ul>
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
      </ul>
    </div>
  );
};

export default WorkputList;
