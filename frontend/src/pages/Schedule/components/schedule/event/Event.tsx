import styles from "./Event.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../../utils/hooks/redux";
import { setEventId, setModalEventInfoIsOpen } from "../../../../../store/modalSlice";
import TaskBadge from "./TaskBadge";
import EventBadge from "./EventBadge";
import { EVENT_TYPE, Event, EVENT_HEIGHT } from "../../../../../utils/types";

interface Props {
  event: Event;
}

const EventSchedule = ({ event }: Props) => {
  const { startDate, endDate, color, title, id, type } = event;

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
      if (type == EVENT_TYPE.task) {
        setHeight(EVENT_HEIGHT.small)
      } else if (type == EVENT_TYPE.event && duration <= 45) {
        setHeight(EVENT_HEIGHT.medium)
      } else {
        setHeight(EVENT_HEIGHT.large)
      }
    }
  }, [timeStart, timeEnd]);

  const handleOpen = (e: any) => {
    e.preventDefault();
    dispatch(setModalEventInfoIsOpen(true));
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
      {type == EVENT_TYPE.task ? (
        <TaskBadge height={height} title={title} time={startDate} />
      ) : (
        <EventBadge
          height={height}
          title={title}
          timeStart={startDate}
          timeEnd={endDate}
        />
      )}
    </li>
  );
};

export default EventSchedule;
