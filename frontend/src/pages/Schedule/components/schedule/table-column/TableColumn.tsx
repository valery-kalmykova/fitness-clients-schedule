import { useAppSelector } from "../../../../../utils/hooks/redux";
import { EVENT_TYPE, Event, EventTask, Task } from "../../../../../utils/types";
import EventCard from "../cards/eventCard/EventCard";
import TaskCard from "../cards/taskCard/TaskCard";
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
        <span>{weekDays![index].short}</span>
      </div>
      <ul>
        {dayEvents &&
          dayEvents
            .sort((a, b) => {return new Date(a.startDate).valueOf() - new Date(b.startDate).valueOf()})
            .map((item: EventTask) => {
              if (item.type === EVENT_TYPE.event) {
                return <EventCard event={item} key={item.id} />;
              } else {
                return <TaskCard event={item} key={item.id} />
              }
            
          })}
      </ul>
    </li>
  );
};

export default TableColumn;
