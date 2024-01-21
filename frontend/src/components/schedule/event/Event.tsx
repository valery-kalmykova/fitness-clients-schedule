import styles from "./Event.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../utils/hooks/redux";
import { setEventId, setModalEventInfoIsOpen } from "../../../store/modalSlice";
import { timeLine, calendarStartHour, EVENT_TYPE, Event } from "../../../utils/constants";
import TaskBadge from "./TaskBadge";
import EventBadge from "./EventBadge";

interface Props {
  event: Event;
  windowSize: number;
}

const EventSchedule = ({ event, windowSize }: Props) => {
  const { startDate, endDate, color, title, id, type } = event;

  const dispatch = useAppDispatch();
  const [rowHeight, setRowHeight] = useState<number>(100);
  const [top, setTop] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [timeStart, setTimeStart] = useState<Date | null>(null);
  const [timeEnd, setTimeEnd] = useState<Date | null>(null);

  useEffect(() => {
    if (windowSize > 768) {
      setRowHeight(100);
    } else {
      setRowHeight(50);
    }
    setTimeStart(new Date(startDate));
  }, [windowSize]);

  useEffect(() => {
    if (timeStart) {
      setTimeEnd(
        endDate ? new Date(endDate) : new Date(timeStart.getTime() + 15 * 60000)
      );
    }
  }, [timeStart]);

  useEffect(() => {
    if (timeStart && timeEnd) {
      const calendarStartHourNumber = timeLine.indexOf(calendarStartHour);
      const hourStart = timeStart.getHours();
      const topHour =
        hourStart >= calendarStartHourNumber
          ? (hourStart - calendarStartHourNumber) * rowHeight
          : (hourStart + 24 - calendarStartHourNumber) * rowHeight; // 24 - count of rows
      const topMinute = (timeStart.getMinutes() * rowHeight) / 60; // 60 - minutes in hour
      setTop(topHour + topMinute);
      setHeight(
        (((timeEnd.getTime() - timeStart.getTime()) / 60000) * rowHeight) / 60
      );
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
        top: top + height <= 2400 ? `${top}px` : "0px",
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
