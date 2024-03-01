import styles from "./Card.module.css";
import { useState } from "react";
import { useAppDispatch } from "../../../../../utils/hooks/redux";
import {
  setEventId,
  setModalTaskInfoIsOpen,
} from "../../../../../store/modalSlice";
import { EVENT_HEIGHT, EventTask } from "../../../../../utils/types";
import { convertToTime } from "../../../../../utils/helpers";
import DoneIcon from "../../../../../assets/images/done-icon.svg";

interface Props {
  event: EventTask;
}

const TaskCard = ({ event }: Props) => {
  const { startDate, title, color, id } = event;

  const dispatch = useAppDispatch();
  const [height] = useState<number>(EVENT_HEIGHT.small);

  const handleOpen = () => {
    dispatch(setModalTaskInfoIsOpen(true));
    dispatch(setEventId(id));
  };

  return (
    <li
      className={styles.eventsItem}
      style={{
        height: `${height}px`,
        backgroundColor: event.done ? "var(--event-done)" : color,
      }}
      onClick={handleOpen}
    >
      {event.done && (
        <div className={styles.tagDone}>
          <img src={DoneIcon} />
        </div>
      )}
      <div className={styles.eventsItemContentS}>
        <p>{convertToTime(startDate)}</p>
        <p>{title}</p>
      </div>
    </li>
  );
};

export default TaskCard;
