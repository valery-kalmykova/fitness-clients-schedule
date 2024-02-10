import styles from "./Card.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../../utils/hooks/redux";
import { setEventId, setModalEventInfoIsOpen } from "../../../../../store/modalSlice";
import { EventTask, EVENT_HEIGHT } from "../../../../../utils/types";
import { convertToTime } from "../../../../../utils/helpers";

interface Props {
  event: EventTask;
}

const EventCard = ({ event }: Props) => {
  const { startDate, endDate, color, client, id } = event;

  const dispatch = useAppDispatch();
  const [height, setHeight] = useState<number>(0);
  const [timeStart, setTimeStart] = useState<Date | null>(null);
  const [timeEnd, setTimeEnd] = useState<Date | null>(null);

  useEffect(() => {
    setTimeStart(new Date(startDate));
  }, []);

  useEffect(() => {
    if (timeStart) {
      setTimeEnd(
        endDate ? new Date(endDate) : new Date(timeStart.getTime() + 15 * 60000)
      );
    }
  }, [timeStart]);

  useEffect(() => {
    if (timeStart && timeEnd) {
      const duration = (timeEnd.getTime() - timeStart.getTime()) / 60000
      if (duration === 15) {
        setHeight(EVENT_HEIGHT.small)
      } else if (duration <= 45 && duration > 15) {
        setHeight(EVENT_HEIGHT.medium)
      } else {
        setHeight(EVENT_HEIGHT.large)
      }
    }
  }, [timeStart, timeEnd]);

  const handleOpen = () => {
    dispatch(setModalEventInfoIsOpen(true));
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
      className={
        height <= 50 ? styles.eventsItemContentS : styles.eventsItemContentL
      }
    >
      <p>
        {convertToTime(startDate)} - {convertToTime(endDate!)}
      </p>
      <p>{client!.name}</p>
    </div>
    </li>
  );
};

export default EventCard;
