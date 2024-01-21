import { useLocation } from "react-router-dom";
import { setModalAddEventIsOpen, setModalAddClientIsOpen } from "../../store/modalSlice";
import { useAppContext } from "../../utils/context/context";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/redux";
import FormsWrapperEvents from "../../pages/Schedule/components/forms/FormsWrapper";
import Modal from "../modal-wrapper/Modal";
import Navigation from "../navigation/Navigation";
import styles from "./Header.module.css";
import FormsWrapperClients from "../../pages/Clients/components/forms/FormsWrapper";

const Header = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { windowSize } = useAppContext();
  const isOpenAddEvent = useAppSelector((state) => state.modal.isOpenAddEvent);
  const isOpenAddClient = useAppSelector((state) => state.modal.isOpenAddClient);

  return (
    <header className={styles.header}>
      {windowSize < 768 && <Navigation />}
      {location.pathname == "/schedule" && (
        <button
          className={styles.button}
          onClick={() => dispatch(setModalAddEventIsOpen(true))}
        >
          + Добавить событие
        </button>
      )}
      {location.pathname == "/clients" && (
        <button
          className={styles.button}
          onClick={() => dispatch(setModalAddClientIsOpen(true))}
        >
          + Добавить клиента
        </button>
      )}
      <div className={styles.user}>
        <div className={styles.userImg}>U</div>
        <p className={styles.userName}>User name</p>
      </div>
      {isOpenAddEvent && (
        <Modal handleClose={() => dispatch(setModalAddEventIsOpen(false))}>
          <FormsWrapperEvents />
        </Modal>
      )}
      {isOpenAddClient && (
        <Modal handleClose={() => dispatch(setModalAddClientIsOpen(false))}>
          <FormsWrapperClients />
        </Modal>
      )}
    </header>
  );
};

export default Header;
