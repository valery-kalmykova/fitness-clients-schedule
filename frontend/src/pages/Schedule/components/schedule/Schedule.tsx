import { useEffect, useMemo, useState } from "react";
import styles from "./Schedule.module.css";
import WeekNav from "./week-nav/WeekNav";
import MobileDates from "./mobile-dates/MobileDates";
import Timeline from "./timeline/Timeline";
import TableColumn from "./table-column/TableColumn";
import { useAppContext } from "../../../../utils/context/context";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks/redux";
import { setActiveWeekDay, setWeekDates } from "../../../../store/weekDatesSlice";
import { useLazyGetAllEventsQuery } from "../../../../store/apiSlice";
import { setWeekEventsStore } from "../../../../store/weekEventsSlice";
import { Event } from "../../../../utils/types";

const Schedule = () => {
  // const { data, error, isLoading } = useGetAllEventsQuery({startDate: "2024-01-01", endDate: "2024-01-07"});
  const [getAllEvents, { data, error, isLoading }] = useLazyGetAllEventsQuery();
  const dispatch = useAppDispatch();
  const activeWeekDay = useAppSelector((state) => state.weekDates.activeDay);
  const weekDates = useAppSelector((state) => state.weekDates.dates);
  const { windowSize } = useAppContext();
  const [weekEvents, setWeekEvents] = useState({
    Понедельник: [],
    Вторник: [],
    Среда: [],
    Четверг: [],
    Пятница: [],
    Суббота: [],
    Воскресенье: [],
  });
  const [weekDays] = useState([
    { long: "Понедельник", short: "Пн" },
    { long: "Вторник", short: "Вт" },
    { long: "Среда", short: "Ср" },
    { long: "Четверг", short: "Чт" },
    { long: "Пятница", short: "Пт" },
    { long: "Суббота", short: "Сб" },
    { long: "Воскресенье", short: "Вск" },
  ]);

  useEffect(() => {
    getTodayDayWeek();
  }, []);

  useMemo(() => {
    if (weekDates) {
      getAllEvents({
        startDate: `${weekDates[0].split("T")[0]}`,
        endDate: `${weekDates[6].split("T")[0]}`,
      });
    }
  }, [weekDates]);

  useEffect(() => {
    if (data) {
      dispatch(setWeekEventsStore(data))
      weekDays.map((item, index) => {
        let events: any;
        if (index < 6) {
          events = data.filter(
            (item: Event) => new Date(item.startDate).getDay() == index + 1
          );
          setWeekEvents((prev) => ({
            ...prev,
            [`${item.long}`]: events,
          }));
        }
        if (index == 6) {
          events = data.filter(
            (item: Event) => new Date(item.startDate).getDay() == 0
          );
          setWeekEvents((prev) => ({
            ...prev,
            [`Воскресенье`]: events,
          }));
        }
      });
    }
  }, [data]);

  function setWeek(date: number) {
    const arr = Array(7).fill(new Date(date));
    const array = arr.map((el, idx) => {
      const date = new Date(el.setDate(el.getDate() - el.getDay() + idx + 1));
      return `${date.toISOString()}`;
    });
    return array;
  }

  function previous() {
    const date = new Date(weekDates![0]);
    const prevMonday = date.setDate(date.getDate() - 7);
    dispatch(setWeekDates(setWeek(prevMonday!)));
    dispatch(setActiveWeekDay(0));
  }

  function next() {
    const date = new Date(weekDates![0]);
    const nextMonday = date.setDate(date.getDate() + 7);
    dispatch(setWeekDates(setWeek(nextMonday!)));
    dispatch(setActiveWeekDay(0));
  }

  function getTodayDayWeek() {
    const date = new Date();
    const yesterday = date.setDate(date.getDate() - 1);
    dispatch(setWeekDates(setWeek(yesterday)));
    dispatch(setActiveWeekDay(date.getDay()));
  }

  return (
    <div className={styles.schedule}>
      <WeekNav
        previous={previous}
        next={next}
        getTodayDayWeek={getTodayDayWeek}
      />
      <MobileDates windowSize={windowSize} weekDays={weekDays} />
      <div className={styles.table}>
        <Timeline />
        <div className={styles.events}>
          <ul className={styles.eventsTable}>
            {weekEvents &&
              weekDates &&
              Object.values(weekEvents).map((dayEvents: any[], index) => {
                if (windowSize < 1024) {
                  if (activeWeekDay == index) {
                    return (
                      <TableColumn
                        index={index}
                        dayEvents={dayEvents}
                        windowSize={windowSize}
                        weekDays={weekDays}
                        key={`column ${index}`}
                      />
                    );
                  }
                } else {
                  return (
                    <TableColumn
                      index={index}
                      dayEvents={dayEvents}
                      windowSize={windowSize}
                      weekDays={weekDays}
                      key={`column ${index}`}
                    />
                  );
                }
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
