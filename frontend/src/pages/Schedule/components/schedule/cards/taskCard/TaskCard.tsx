import styles from "./TaskCard.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../../../utils/hooks/redux";
import {
  setEventId,
  setModalTaskInfoIsOpen,
} from "../../../../../../store/modalSlice";
import { EVENT_HEIGHT, EventTask } from "../../../../../../utils/types";
import { convertToTime } from "../../../../../../utils/helpers";

interface Props {
  event: EventTask;
}

const TaskCard = ({ event }: Props) => {
  const { startDate, title, color, id } = event;

  const dispatch = useAppDispatch();
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    setHeight(EVENT_HEIGHT.small);
  }, []);

  const handleOpen = (e: any) => {
    e.preventDefault();
    dispatch(setModalTaskInfoIsOpen(true));
    dispatch(setEventId(e.currentTarget.dataset.id));
  };

  return (
    <li
      className={styles.eventsItem}
      style={{
        height: `${height}px`,
        backgroundColor: color,
      }}
      onClick={(e) => handleOpen(e)}
      data-id={id}
    >
      <div
        className={
          height <= 50 ? styles.eventsItemContentS : styles.eventsItemContentL
        }
      >
        <p>{convertToTime(startDate)}</p>
        <p>{title}</p>
      </div>
    </li>
  );
};

export default TaskCard;
