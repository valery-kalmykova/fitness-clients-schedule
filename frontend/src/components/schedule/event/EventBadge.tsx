import { convertToTime } from "../../../utils/helpers";
import styles from "./Event.module.css";

interface Props {
  timeStart: string;
  timeEnd: string;
  title: string;
  height: number;
}

const EventBadge = ({ timeStart, timeEnd, title, height }: Props) => {
  return (
    <div
      className={
        height <= 50 ? styles.eventsItemContentS : styles.eventsItemContentL
      }
    >
      <p>
        {convertToTime(timeStart)} - {convertToTime(timeEnd)}
      </p>
      <p>{title}</p>
    </div>
  );
};

export default EventBadge;
