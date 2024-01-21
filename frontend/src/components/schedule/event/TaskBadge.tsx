import { convertToTime } from "../../../utils/helpers";
import styles from "./Event.module.css";

interface Props {
  time: string;
  title: string;
  height: number;
}

const TaskBadge = ({ time, title, height }: Props) => {
  return (
    <div
      className={
        height <= 50 ? styles.eventsItemContentS : styles.eventsItemContentL
      }
    >
      <p>{convertToTime(time)}</p>
      <p>{title}</p>
    </div>
  );
};

export default TaskBadge;
