import styles from "./ModalEvent.module.css";
import EditIcon from "../../../../assets/images/edit-svg.svg";
import { EVENT_TYPE } from "../../../../utils/types";
import PopoverEditRegular from "../popovers/PopoverEditRegular";
import PopoverDeleteRegular from "../popovers/PopoverDeleteRegular";
import PopoverDeleteSingle from "../popovers/PopoverDeleteSingle";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks/redux";
import { setEditMode } from "../../../../store/modalSlice";

interface Props {
  relatedId?: string;
}

const ControlButtons = ({ relatedId }: Props) => {
  const dispatch = useAppDispatch();
  const editMode = useAppSelector((state) => state.modal.editMode);
  const eventId = useAppSelector((state) => state.modal.eventId);

  return (
    <div className={styles.buttons}>
      {!relatedId && (
        <button
          className={styles.button}
          onClick={() => dispatch(setEditMode(!editMode))}
        >
          <img src={EditIcon} />
        </button>
      )}
      {!editMode && relatedId && (
        <PopoverEditRegular relatedId={relatedId!} clickedId={eventId!} />
      )}
      {editMode && relatedId && (
        <button
          className={styles.button}
          onClick={() => dispatch(setEditMode(!editMode))}
        >
          <img src={EditIcon} />
        </button>
      )}
      {relatedId ? (
        <PopoverDeleteRegular relatedId={relatedId} />
      ) : (
        <PopoverDeleteSingle type={EVENT_TYPE.event} />
      )}
    </div>
  );
};

export default ControlButtons;
