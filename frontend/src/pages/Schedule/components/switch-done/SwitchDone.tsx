import { Switch } from "antd";
import styles from "./SwitchDone.module.css";

interface Props {
  state: boolean;
  onChange: () => void;
}

const SwitchDone = ({ state, onChange }: Props) => {
  return (
    <div className={styles.container}>
      <Switch onChange={onChange} value={state} />
      {state ? <p>Завершено</p> : <p>Не завершено</p>}
    </div>
  );
};

export default SwitchDone;
