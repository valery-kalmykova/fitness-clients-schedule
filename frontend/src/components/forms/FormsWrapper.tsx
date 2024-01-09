import styles from "./FormWrapper.module.css";
import { ConfigProvider, Segmented } from "antd";
import FormAddEvent from "./event-add/FormAddEvent";
import FormAddTask from "./task-add/FormAddTask";
import { useState } from "react";

const options = [
  { label: "Событие", value: "event" },
  { label: "Задача", value: "task" },
];

const FormsWrapper = () => {
  const [value, setValue] = useState<string | number>("event");
  return (
    <div className={styles.container}>
      <ConfigProvider
        theme={{
          components: {
            Segmented: {
              itemSelectedBg: "#3B887B",
            }
          }
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
      {value === "task" && <FormAddTask />}
      {value === "event" && <FormAddEvent />}
    </div>
  );
};

export default FormsWrapper;
