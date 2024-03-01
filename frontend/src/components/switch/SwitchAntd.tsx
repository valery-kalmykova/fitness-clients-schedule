import { Switch } from "antd";
import styles from "./Switch.module.css";

interface Props {
  state: boolean;
  onChange: () => void;
  trueText: string;
  falseText: string;
}

const SwitchAntd = ({ state, onChange, trueText, falseText }: Props) => {
  return (
    <div className={styles.container}>
      <Switch onChange={onChange} value={state} />
      {state ? <p>{trueText}</p> : <p>{falseText}</p>}
    </div>
  );
};

export default SwitchAntd;
