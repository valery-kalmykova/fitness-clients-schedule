import styles from "./Event.module.css";
import { timeLine, calendarStartHour } from "../../../utils/data";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../utils/hooks/redux";
import { setEventId, setModalIsOpen } from "../../../store/modalEventSlice";
import { Event } from "../../../utils/constants";

interface Props {
  event: Event;
  windowSize: number;
}

const EventSchedule = ({ event, windowSize }: Props) => {
  const {
    startDate,
    endDate,
    color,
    title,
    id,
    type,
    description,
    comment,
    done,
  } = event;

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
    dispatch(setModalIsOpen(true));
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
      <div
        className={
          height <= 50 ? styles.eventsItemContentS : styles.eventsItemContentL
        }
      >
        {timeStart && timeEnd && (
          <p>
            {timeStart.getHours().toString() +
              ":" +
              timeStart.getMinutes().toString()}{" "}
            -{" "}
            {timeEnd.getHours().toString() +
              ":" +
              timeEnd.getMinutes().toString()}
          </p>
        )}
        <p>{title}</p>
      </div>
    </li>
  );
};

export default EventSchedule;
