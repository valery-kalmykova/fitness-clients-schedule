import { setActiveWeekDay } from "../../../store/weekDatesSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks/redux";
import styles from "./MobileDates.module.css";

interface Props {
  windowSize: number;
  weekDays: { long: string; short: string }[];
}

const MobileDates = ({ windowSize, weekDays }: Props) => {
  const dispatch = useAppDispatch();
  const activeWeekDay = useAppSelector((state) => state.weekDates.activeDay);
  const weekDates = useAppSelector((state) => state.weekDates.dates);
  return (
    <div className={styles.mobileDatesLine}>
      {windowSize < 1024 &&
        weekDates &&
        weekDates.map((item: any, index: number) => {
          return (
            <div
              className={styles.mobileDateContainer}
              key={`mobile date ${index}`}
            >
              <span className={styles.mobileDateDay}>
                {weekDays[index].short}
              </span>
              <button
                onClick={() => dispatch(setActiveWeekDay(index))}
                className={
                  activeWeekDay === index
                    ? `${styles.mobileDateBtn} ${styles.mobileDateBtnActive}`
                    : styles.mobileDateBtn
                }
              >
                {`${new Date(item).toLocaleDateString().slice(0,2)}`}
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default MobileDates;
