import { useEffect } from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import CloseIcon from "../../assets/images/close-svg.svg";
import ModalOverlay from "./ModalOverlay";

interface ModalProps {
  children: React.ReactNode;
  handleClose: () => void;
}

interface KeyboardEvent {
  key: string;
}

const Modal = ({ children, handleClose }: ModalProps) => {
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <ModalOverlay handleClose={handleClose!} />
      <div className={styles.container}>
        <button className={styles.btnClose} onClick={handleClose}>
          <img src={CloseIcon} />
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
