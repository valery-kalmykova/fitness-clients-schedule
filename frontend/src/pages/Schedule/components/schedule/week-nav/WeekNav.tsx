import styles from "./WeekNav.module.css";
import NextIcon from "../../../../../assets/images/next-icon.svg";
import BackIcon from "../../../../../assets/images/arrow-sm-right-svg.svg";
import { useAppSelector } from "../../../../../utils/hooks/redux";

interface Props {
  previous: () => void;
  next: () => void;
  getTodayDayWeek: () => void;
}

const WeekNav = ({ previous, next, getTodayDayWeek }: Props) => {
  const weekDates = useAppSelector((state) => state.weekDates.dates);
  return (
    <div className={styles.datesMenu}>
      <button
        onClick={() => previous()}
        className={styles.datesMenuBtn}
        type="button"
      >
        <img
          className={styles.imageRotate}
          src={NextIcon}
          alt="Предыдущий слайд"
        />
      </button>
      {weekDates && (
        <p className={styles.datesMenuText}>
          {`${new Date(weekDates![0])
            .toLocaleDateString()
            .slice(0, 5)} - ${new Date(weekDates![6])
            .toLocaleDateString()
            .slice(0, 5)}`}
        </p>
      )}
      <button
        onClick={() => next()}
        className={styles.datesMenuBtn}
        type="button"
      >
        <img className={styles.btnImage} src={NextIcon} alt="Следующий слайд" />
      </button>
      <button
        className={styles.datesTodayBtn}
        onClick={() => getTodayDayWeek()}
        type="button"
      >
        <img src={BackIcon} className={styles.datesTodayBtnImg} />
        <span>Сегодня</span>
      </button>
    </div>
  );
};

export default WeekNav;
