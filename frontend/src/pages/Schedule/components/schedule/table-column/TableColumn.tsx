import { useAppSelector } from "../../../../../utils/hooks/redux";
import { Event } from "../../../../../utils/types";
import EventSchedule from "../event/Event";
import styles from "./TableColumn.module.css";

interface Props {
  index: number;
  dayEvents: Event[];
  weekDays: { long: string; short: string }[];
}

const TableColumn = ({ index, dayEvents, weekDays }: Props) => {
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
          dayEvents
            .sort((a, b) => {return new Date(a.startDate).valueOf() - new Date(b.startDate).valueOf()})
            .map((item: Event) => {
            return <EventSchedule event={item} key={item.id} />;
          })}
      </ul>
    </li>
  );
};

export default TableColumn;
