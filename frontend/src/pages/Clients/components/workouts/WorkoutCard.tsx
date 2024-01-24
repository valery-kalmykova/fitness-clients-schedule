import { useState } from "react";
import styles from "./workouts.module.css";
import { Button, Input, Space } from "antd";

const WorkoutCard = () => {
  const [value, setValue] = useState<string>("")
  function handleClick() {
    console.log(value)
    setValue("")
  }
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
      <div className={styles.blockContainerRow} style={{ flexGrow: "1" }}>
        <Space.Compact style={{ width: "100%" }}>
          <Input value={value} onChange={(e)=>setValue(e.currentTarget.value)} />
          <Button type="primary" onClick={handleClick}>
            Добавить
          </Button>
        </Space.Compact>
      </div>
    </li>
  );
};

export default WorkoutCard;
