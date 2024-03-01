import styles from "./ModalEvent.module.css";
import Modal from "../../../../components/modal-wrapper/Modal";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks/redux";
import {
  setEditMode,
  setEventId,
  setModalEventInfoIsOpen,
} from "../../../../store/modalSlice";
import EventCard from "./EventCard";
import { useGetEventQuery } from "../../../../store/apiSlice";
import ControlButtons from "./ControlButtons";

const ModalEvent = () => {
  const dispatch = useAppDispatch();
  const eventId = useAppSelector((state) => state.modal.eventId);
  const { data } = useGetEventQuery(eventId);

  const handleClose = () => {
    dispatch(setModalEventInfoIsOpen(false));
    dispatch(setEventId(null));
    dispatch(setEditMode(false));
  };

  if (data) {
    return (
      <Modal handleClose={() => handleClose()}>
        <div className={styles.row}>
          <div className={styles.tag} style={{ backgroundColor: data.color }}>
            Тренировка
          </div>
          <ControlButtons relatedId={data.related_to} />
        </div>
        <EventCard eventId={eventId!} />
      </Modal>
    );
  }
};

export default ModalEvent;
