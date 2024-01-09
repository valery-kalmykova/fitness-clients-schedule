import styles from "./ModalEvent.module.css";
import Modal from "../modal-wrapper/Modal";
import EditIcon from "../../assets/images/edit-svg.svg";
import DeleteIcon from "../../assets/images/delete-svg.svg";
import { useAppDispatch } from "../../utils/hooks/redux";
import { setEventId, setModalIsOpen } from "../../store/modalEventSlice";

const ModalEvent = () => {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(setModalIsOpen(false));
    dispatch(setEventId(null))
  }

  return (
    <Modal handleClose={() => handleClose()}>
      <div className={styles.buttons}>
        <button className={styles.button}>
          <img src={EditIcon} />
        </button>
        <button className={styles.button}>
          <img src={DeleteIcon} />
        </button>
      </div>
      <h2>Тренировка</h2>
      <p>06.15 - 07.45</p>
      <p>Тренировка</p>
      <p>Описание</p>
    </Modal>
  );
};

export default ModalEvent;
