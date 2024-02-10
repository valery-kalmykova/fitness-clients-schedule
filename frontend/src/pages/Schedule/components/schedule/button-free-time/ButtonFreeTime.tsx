import { Popover } from "antd";
import styles from "./ButtonFreeTime.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../utils/hooks/redux";
import { setIsShowFreeTime } from "../../../../../store/weekEventsSlice";

const ButtonFreeTime = () => {
  const dispatch = useAppDispatch();
  const isShow = useAppSelector((state) => state.weekEvents.isShowFreeTime);

  function handleShowFree() {
    dispatch(setIsShowFreeTime(!isShow));
  }

  const content = isShow ? (
    <p>Скрыть свободное время</p>
  ) : (
    <p>Показать свободное время</p>
  );

  return (
    <Popover content={content}>
      <button
        className={
          isShow
            ? styles.freeBtn + " " + styles.freeBtnActive
            : styles.freeBtn + " " + styles.freeBtnInactive
        }
        onClick={handleShowFree}
      >
        FREE
      </button>
    </Popover>
  );
};

export default ButtonFreeTime;
