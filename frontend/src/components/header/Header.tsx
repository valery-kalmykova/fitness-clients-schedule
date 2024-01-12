import { setModalAddEventIsOpen } from "../../store/modalSlice";
import { useAppContext } from "../../utils/context/context";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/redux";
import FormsWrapper from "../forms/FormsWrapper";
import Modal from "../modal-wrapper/Modal";
import Navigation from "../navigation/Navigation";
import styles from "./Header.module.css";

const Header = () => {
  const dispatch = useAppDispatch()
  const { windowSize } = useAppContext();
  const isOpen = useAppSelector((state) => state.modal.isOpenAddEvent);

  return (
    <header className={styles.header}>
      {windowSize < 768 && <Navigation />}
      <button className={styles.button} onClick={()=>dispatch(setModalAddEventIsOpen(true))}>+ Добавить событие</button>
      <div className={styles.user}>
        <div className={styles.userImg}>U</div>
        <p className={styles.userName}>User name</p>
      </div>
      {isOpen && (
        <Modal handleClose={()=>dispatch(setModalAddEventIsOpen(false))}>
          <FormsWrapper />
        </Modal>
      )}
    </header>
  );
};

export default Header;
