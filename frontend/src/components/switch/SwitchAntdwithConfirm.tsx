import { Popconfirm, Switch } from "antd";
import styles from "./Switch.module.css";

interface Props {
  state: boolean;
  onChange: () => void;
  trueText: string;
  falseText: string;
  title: string;
}

const SwitchAntdwithConfirm = ({
  state,
  onChange,
  trueText,
  falseText,
  title,
}: Props) => {
  return (
    <div className={styles.container}>
      <Popconfirm onConfirm={onChange} title={title}>
        <Switch value={state} />
      </Popconfirm>
      {state ? <p>{trueText}</p> : <p>{falseText}</p>}
    </div>
  );
};

export default SwitchAntdwithConfirm;
