import styles from "./ModalEvent.module.css";
import Modal from "../../../../components/modal-wrapper/Modal";
// import EditIcon from "../../../../assets/images/edit-svg.svg";
import DeleteIcon from "../../../../assets/images/delete-svg.svg";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks/redux";
import { setEventId, setModalEventInfoIsOpen } from "../../../../store/modalSlice";
import { useEffect, useState } from "react";
import EventCard from "./event-card/EventCard";
import { EVENT_TYPE, Event } from "../../../../utils/types";

const ModalEvent = () => {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(setModalEventInfoIsOpen(false));
    dispatch(setEventId(null));
  };
  const data = useAppSelector((state) => state.weekEvents.events);
  const eventId = useAppSelector((state) => state.modal.eventId);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (data) {
      setCurrentEvent(data.find((item) => item.id === eventId)!);
    }
  }, [data]);

  return (
    <Modal handleClose={() => handleClose()}>
      <div className={styles.row}>
        <div className={styles.tag} style={{backgroundColor: currentEvent?.color}}>
          {currentEvent?.type == EVENT_TYPE.task ? "Задача" : "Тренировка"}
        </div>
        <div className={styles.buttons}>
          {/* <button className={styles.button}>
            <img src={EditIcon} />
          </button> */}
          <button className={styles.button}>
            <img src={DeleteIcon} />
          </button>
        </div>
      </div>
      <EventCard event={currentEvent} />
    </Modal>
  );
};

export default ModalEvent;
