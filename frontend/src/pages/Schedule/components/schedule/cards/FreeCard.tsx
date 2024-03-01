import styles from "./Card.module.css";
import { useState } from "react";
import { useAppDispatch } from "../../../../../utils/hooks/redux";
import {
  setModalAddEventIsOpen,
  setSelectedDate,
} from "../../../../../store/modalSlice";
import { EVENT_HEIGHT, EventTask } from "../../../../../utils/types";
import { convertToTime } from "../../../../../utils/helpers";

interface Props {
  event: EventTask;
}

const FreeCard = ({ event }: Props) => {
  const { startDate, color } = event;

  const dispatch = useAppDispatch();
  const [height] = useState<number>(EVENT_HEIGHT.small);

  const handleOpen = (e: any) => {
    e.preventDefault();
    dispatch(setModalAddEventIsOpen(true));
    dispatch(setSelectedDate(event.startDate));
  };

  return (
    <li
      className={styles.eventsItem}
      style={{
        height: `${height}px`,
        backgroundColor: color,
      }}
      onClick={(e) => handleOpen(e)}
    >
      <div className={styles.eventsItemContentS}>
        <p>{convertToTime(startDate)}</p>
        <p>Свободное время</p>
      </div>
    </li>
  );
};

export default FreeCard;
