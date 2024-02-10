import styles from "./ModalEvent.module.css";
import Modal from "../../../../components/modal-wrapper/Modal";
import EditIcon from "../../../../assets/images/edit-svg.svg";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks/redux";
import {
  setEditMode,
  setEventId,
  setModalEventInfoIsOpen,
} from "../../../../store/modalSlice";
import EventCard from "./cards/EventCard";
import { EVENT_TYPE } from "../../../../utils/types";
import { useGetEventQuery } from "../../../../store/apiSlice";
import PopoverDeleteRegular from "./popover-delete/PopoverDeleteRegular";
import PopoverDeleteSingle from "./popover-delete/PopoverDeleteSingle";

const ModalEvent = () => {
  const dispatch = useAppDispatch();
  const editMode = useAppSelector((state)=>state.modal.editMode);
  const eventId = useAppSelector((state) => state.modal.eventId);
  const { data } = useGetEventQuery(eventId);

  const handleClose = () => {
    dispatch(setModalEventInfoIsOpen(false));
    dispatch(setEventId(null));
  };

  if (data) {
    return (
      <Modal handleClose={() => handleClose()}>
        <div className={styles.row}>
          <div className={styles.tag} style={{ backgroundColor: data.color }}>
            Тренировка
          </div>
          <div className={styles.buttons}>
            <button className={styles.button} onClick={()=>dispatch(setEditMode(!editMode))}>
              <img src={EditIcon} />
            </button>
            {data.related_to ? (
              <PopoverDeleteRegular relatedId={data.related_to} />
            ) : (
              <PopoverDeleteSingle type={EVENT_TYPE.event} />
            )}
          </div>
        </div>
        <EventCard eventId={eventId!} />
      </Modal>
    );
  }
};

export default ModalEvent;
