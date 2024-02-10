import styles from "./ModalEvent.module.css";
import Modal from "../../../../components/modal-wrapper/Modal";
import EditIcon from "../../../../assets/images/edit-svg.svg";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks/redux";
import {
  setEditMode,
  setEventId,
  setModalTaskInfoIsOpen,
} from "../../../../store/modalSlice";
import { useGetTaskQuery } from "../../../../store/apiSlice";
import PopoverDeleteSingle from "./popover-delete/PopoverDeleteSingle";
import TaskCard from "./cards/TaskCard";
import { EVENT_TYPE } from "../../../../utils/types";

const ModalTask = () => {
  const dispatch = useAppDispatch();
  const editMode = useAppSelector((state)=>state.modal.editMode);
  const eventId = useAppSelector((state) => state.modal.eventId);
  const { data } = useGetTaskQuery(eventId);

  const handleClose = () => {
    dispatch(setModalTaskInfoIsOpen(false));
    dispatch(setEventId(null));
  };

  if (data) {
    return (
      <Modal handleClose={() => handleClose()}>
        <div className={styles.row}>
          <div className={styles.tag} style={{ backgroundColor: data.color }}>
          Задача
          </div>
          <div className={styles.buttons} >
            <button className={styles.button} onClick={()=>dispatch(setEditMode(!editMode))}>
              <img src={EditIcon} />
            </button>
            <PopoverDeleteSingle type={EVENT_TYPE.task} />
          </div>
        </div>
        <TaskCard eventId={eventId!} />
      </Modal>
    );
  }
};

export default ModalTask;
