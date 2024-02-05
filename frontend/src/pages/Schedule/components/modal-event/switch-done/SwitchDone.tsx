import { Switch } from "antd";
import styles from "./SwitchDone.module.css";
import { useEffect, useState } from "react";

interface Props {
  state: boolean;
  onChange: () => void;
}

const SwitchDone = ({state, onChange}: Props) => {
  return (
    <div className={styles.container}>
      <Switch onChange={onChange} value={state} />
      {state ? <p>Не завершено</p> : <p>Завершено</p>}
    </div>
  );
};

export default SwitchDone;
