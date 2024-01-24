import { useAppSelector } from "../../../../../utils/hooks/redux";
import { Event } from "../../../../../utils/types";
import EventSchedule from "../event/Event";
import styles from "./TableColumn.module.css";

interface Props {
  index: number;
  dayEvents: Event[];
  windowSize: number;
  weekDays: { long: string; short: string }[];
}

const TableColumn = ({ index, dayEvents, windowSize, weekDays }: Props) => {
  const activeWeekDay = useAppSelector((state) => state.weekDates.activeDay);
  const weekDates = useAppSelector((state) => state.weekDates.dates);
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
        <span>{weekDays![index].long}</span>
      </div>
      <ul>
        {dayEvents &&
          dayEvents.map((item: Event) => {
            return <EventSchedule event={item} windowSize={windowSize} key={item.id} />;
          })}
      </ul>
    </li>
  );
};

export default TableColumn;
