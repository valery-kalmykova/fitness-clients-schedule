import styles from "./workouts.module.css";

const WorkoutCard = () => {
  return (
    <li className={styles.blockContainer}>
      <div className={styles.blockContainerRow}>
        <h4>Дата:</h4>
        <p>01.01.2024</p>
      </div>
      <div className={styles.blockContainerRow}>
        <h4>Описание:</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </p>
      </div>
      <div className={styles.blockContainerRow}>
        <h4>Комментарии:</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </p>
      </div>
    </li>
  );
};

export default WorkoutCard;
