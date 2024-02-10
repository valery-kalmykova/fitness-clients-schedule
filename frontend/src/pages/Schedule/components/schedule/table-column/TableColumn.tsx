import { setModalAddEventIsOpen, setSelectedDate } from "../../../../../store/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../../../utils/hooks/redux";
import { EVENT_TYPE, Event, EventTask } from "../../../../../utils/types";
import EventCard from "../cards/EventCard";
import TaskCard from "../cards/TaskCard";
import styles from "./TableColumn.module.css";

interface Props {
  index: number;
  dayEvents: Event[];
  weekDays: { long: string; short: string }[];
}

const TableColumn = ({ index, dayEvents, weekDays }: Props) => {
  const activeWeekDay = useAppSelector((state) => state.weekDates.activeDay);
  const weekDates = useAppSelector((state) => state.weekDates.dates);
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setModalAddEventIsOpen(true));
    dispatch(setSelectedDate(weekDates![index]))
  }

  return (
    <li className={styles.eventsGroup} key={index}>
      <div className={styles.eventsGroupTitle}>
        <span
          className={
            activeWeekDay == index
              ? `${styles.eventsGroupDate} ${styles.eventsGroupDateActive}`
              : styles.eventsGroupDate
          }
        >
          {`${new Date(weekDates![index]).toLocaleDateString().slice(0, 5)}`}
        </span>
        <span>{weekDays![index].short}</span>
      </div>
      <ul>
        {dayEvents &&
          dayEvents
            .map((item: EventTask) => {
              if (item.type === EVENT_TYPE.event) {
                return <EventCard event={item} key={item.id} />;
              } else if (item.type === EVENT_TYPE.task) {
                return <TaskCard event={item} key={item.id} />
              }
            
          })}
      </ul>
      <div className={styles.eventsGroupBtnContainer}>
        <button className={styles.eventsGroupBtn} onClick={handleClick}>+ Добавить</button>
      </div>
    </li>
  );
};

export default TableColumn;
