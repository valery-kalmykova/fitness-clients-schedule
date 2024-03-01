import { Popconfirm, Switch } from "antd";
import styles from "./SwitchDone.module.css";

interface Props {
  title: string;
  state: boolean;
  onChange: () => void;
}

const SwitchDonewithConfirm = ({ title, state, onChange }: Props) => {
  return (
    <div className={styles.container}>
      <Popconfirm onConfirm={onChange} title={title}>
        <Switch value={state} />
      </Popconfirm>
      {state ? <p>Завершено</p> : <p>Не завершено</p>}
    </div>
  );
};

export default SwitchDonewithConfirm;
