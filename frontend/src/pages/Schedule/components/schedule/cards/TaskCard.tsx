import styles from "./Card.module.css";
import { useState } from "react";
import { useAppDispatch } from "../../../../../utils/hooks/redux";
import {
  setEventId,
  setModalTaskInfoIsOpen,
} from "../../../../../store/modalSlice";
import { EVENT_HEIGHT, EventTask } from "../../../../../utils/types";
import { convertToTime } from "../../../../../utils/helpers";

interface Props {
  event: EventTask;
}

const TaskCard = ({ event }: Props) => {
  const { startDate, title, color, id } = event;

  const dispatch = useAppDispatch();
  const [height, setHeight] = useState<number>(EVENT_HEIGHT.small);

  const handleOpen = () => {
    dispatch(setModalTaskInfoIsOpen(true));
    dispatch(setEventId(id));
  };

  return (
    <li
      className={styles.eventsItem}
      style={{
        height: `${height}px`,
        backgroundColor: color,
      }}
      onClick={handleOpen}
    >
      <div
        className={styles.eventsItemContentS}
      >
        <p>{convertToTime(startDate)}</p>
        <p>{title}</p>
      </div>
    </li>
  );
};

export default TaskCard;
