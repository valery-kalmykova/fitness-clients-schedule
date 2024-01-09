import { useAppContext } from "../../utils/context/context";
import { useModal } from "../../utils/hooks/usemodal";
import FormsWrapper from "../forms/FormsWrapper";
import Modal from "../modal-wrapper/Modal";
import Navigation from "../navigation/Navigation";
import styles from "./Header.module.css";

const Header = () => {
  const { isOpen, onClose, open } = useModal();
  const { windowSize } = useAppContext();

  return (
    <header className={styles.header}>
      {windowSize < 768 && <Navigation />}
      <button className={styles.button} onClick={open}>+ Добавить событие</button>
      <div className={styles.user}>
        <div className={styles.userImg}>U</div>
        <p className={styles.userName}>User name</p>
      </div>
      {isOpen && (
        <Modal handleClose={onClose}>
          <FormsWrapper />
        </Modal>
      )}
    </header>
  );
};

export default Header;
