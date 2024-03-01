import { Event } from "../../../../utils/types";
import styles from "./workouts.module.css";
import EditIcon from "../../../../assets/images/edit-svg.svg";
import DoneIcon from "../../../../assets/images/done-icon.svg";
import { useAppDispatch } from "../../../../utils/hooks/redux";
import {
  setEditMode,
  setEventId,
  setModalEventInfoIsOpen,
} from "../../../../store/modalSlice";
import PopoverEditRegular from "../../../Schedule/components/popovers/PopoverEditRegular";

interface Props {
  event: Event;
}

const WorkoutCard = ({ event }: Props) => {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setModalEventInfoIsOpen(true));
    dispatch(setEditMode(true));
    dispatch(setEventId(event.id));
  }

  return (
    <li className={`${styles.flexColumn} ${styles.workoutCard}`}>
      <div className={styles.asideIcons}>
        {event.related_to ? (
          <PopoverEditRegular
            relatedId={event.related_to!}
            clickedId={event.id}
          />
        ) : (
          <button className={styles.buttonEdit} onClick={handleClick}>
            <img src={EditIcon} />
          </button>
        )}
        {event.done && (
          <div className={styles.tagDone}>
            <img src={DoneIcon} />
          </div>
        )}
      </div>
      <div className={styles.blockContainer}>
        <div className={styles.blockContainerRow}>
          <h4>Дата:</h4>
          <p>{new Date(event.startDate).toLocaleDateString()}</p>
        </div>
        <div className={styles.blockContainerRow}>
          <h4>Время:</h4>
          <p>{`${new Date(event.startDate)
            .toLocaleTimeString()
            .slice(0, 5)} - ${new Date(event.endDate)
            .toLocaleTimeString()
            .slice(0, 5)}`}</p>
        </div>
      </div>
      {event.comments.length > 0 && (
        <div className={styles.flexColumn}>
          <h4 className={styles.blockTitle}>Комментарии:</h4>
          <ul>
            {event.comments.map((el: string, index: number) => {
              return <li key={index}>{el}</li>;
            })}
          </ul>
        </div>
      )}
    </li>
  );
};

export default WorkoutCard;
