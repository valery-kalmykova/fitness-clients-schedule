import MainCardBody from "../../../../components/main-card-body/MainCardBody";
import WorkputList from "../workouts/WorkoutList";
import styles from "./ClientInfo.module.css";

const ClientInfo = () => {
  return (
    <MainCardBody flexGrow={4}>
        <div className={styles.blockContainer}>
        <div className={styles.blockContainerRow}>
          <h2>Dfkthbz Rfkvsrjdf</h2>
          <p>89167565137</p>
        </div>
      </div>
      <div className={styles.blockContainer}>
        <div className={styles.blockContainerRow}>
          <h3>Рост:</h3>
          <p>173 см</p>
        </div>
        <div className={styles.blockContainerRow}>
          <h3>Вес:</h3>
          <p>80 кг</p>
        </div>
      </div>
      <div className={styles.blockContainer}>
        <div className={styles.blockContainerRow}>
          <h3>Состояние здоровья:</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
        <WorkputList />
      </MainCardBody>
  );
};

export default ClientInfo;
