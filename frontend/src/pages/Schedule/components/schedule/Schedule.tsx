import { useEffect, useState } from "react";
import styles from "./Schedule.module.css";
import WeekNav from "./week-nav/WeekNav";
import MobileDates from "./mobile-dates/MobileDates";
import TableColumn from "./table-column/TableColumn";
import { useAppContext } from "../../../../utils/context/context";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks/redux";
import {
  setActiveWeekDay,
  setWeekDates,
} from "../../../../store/weekDatesSlice";
import {
  useLazyGetAllEventsQuery,
  useLazyGetAllTasksQuery,
} from "../../../../store/apiSlice";
import { EventTask } from "../../../../utils/types";
// import ButtonFreeTime from "./button-free-time/ButtonFreeTime";

const Schedule = () => {
  const [getAllEvents, { data: eventsData }] = useLazyGetAllEventsQuery();
  const [getAllTasks, { data: tasksData }] = useLazyGetAllTasksQuery();
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

  useEffect(() => {
    if (weekDates) {
      getAllEvents({
        startDate: `${weekDates[0].split("T")[0]}`,
        endDate: `${weekDates[6].split("T")[0]}`,
      });
      getAllTasks({
        startDate: `${weekDates[0].split("T")[0]}`,
        endDate: `${weekDates[6].split("T")[0]}`,
      });
    }
  }, [weekDates]);

  // useEffect(() => {
  //   if (eventsData) {
  //     const eventsDatawithFree = eventsData
  //       .sort((a: Event, b: Event) => {
  //         return (
  //           new Date(a.startDate).valueOf() - new Date(b.startDate).valueOf()
  //         );
  //       })
  // .map((item: Event, index: number) => {
  //   if(index === 0) {
  //     const midNight = new Date(item.startDate);
  //     midNight.setHours(0);
  //     midNight.setMinutes(0);
  //     if (midNight < new Date(item.startDate)) {
  //       eventsData.push({
  //         type: EVENT_TYPE.free,
  //         startDate: item.endDate,
  //         endDate: eventsData[index + 1].startDate,
  //       });
  //     }
  //   }
  // if (
  //   new Date(item.endDate) > new Date(eventsData[index + 1].startDate)
  // ) {
  //   eventsData.push({
  //     type: EVENT_TYPE.free,
  //     startDate: item.endDate,
  //     endDate: eventsData[index + 1].startDate,
  //   });
  // }
  // });
  //     console.log(eventsDatawithFree)
  //   }
  // }, [eventsData]);

  useEffect(() => {
    if (eventsData && tasksData) {
      const allEvents = eventsData.concat(tasksData);
      weekDays.map((item, index) => {
        let events: any;
        // let free: any[];
        if (index < 6) {
          events = allEvents
            .filter(
              (item: EventTask) =>
                new Date(item.startDate).getDay() == index + 1
            )
            .sort((a: EventTask, b: EventTask) => {
              return (
                new Date(a.startDate).valueOf() -
                new Date(b.startDate).valueOf()
              );
            });
          // .map((item: EventTask, index: number) => {
          //   if (index === 0) {
          //     console.log(item)
          // const midNight = new Date(item.startDate);
          // midNight.setHours(0);
          // midNight.setMinutes(0);
          // if (midNight < new Date(item.startDate)) {
          //   let freeItem = {
          //     type: EVENT_TYPE.free,
          //     startDate: item.endDate,
          //     endDate: allEvents[index + 1].startDate,
          //   }
          //   console.log(freeItem)
          //   // free.push(freeItem);
          // }
          //   }
          // });
          setWeekEvents((prev) => ({
            ...prev,
            [`${item.long}`]: events,
          }));
        }
        if (index == 6) {
          events = allEvents
            .filter((item: EventTask) => new Date(item.startDate).getDay() == 0)
            .sort((a: EventTask, b: EventTask) => {
              return (
                new Date(a.startDate).valueOf() -
                new Date(b.startDate).valueOf()
              );
            });
          setWeekEvents((prev) => ({
            ...prev,
            [`Воскресенье`]: events,
          }));
        }
      });
    }
  }, [eventsData, tasksData]);

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
      <div className={styles.scheduleMenu}>
        {/* <ButtonFreeTime /> */}
        <WeekNav
          previous={previous}
          next={next}
          getTodayDayWeek={getTodayDayWeek}
        />
      </div>
      {windowSize <= 1024 && <MobileDates weekDays={weekDays} />}
      <div className={styles.table}>
        <ul className={styles.tbody}>
          {weekEvents &&
            weekDates &&
            Object.values(weekEvents).map((dayEvents: any[], index) => {
              if (windowSize < 1024) {
                if (activeWeekDay == index) {
                  return (
                    <TableColumn
                      index={index}
                      dayEvents={dayEvents}
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
                    weekDays={weekDays}
                    key={`column ${index}`}
                  />
                );
              }
            })}
        </ul>
      </div>
    </div>
  );
};

export default Schedule;
