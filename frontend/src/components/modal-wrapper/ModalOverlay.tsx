import styles from './Modal.module.css';

interface ModalOverlayProps {  
  handleClose: () => void;
  children: React.ReactNode
}

const ModalOverlay = ({handleClose, children}: ModalOverlayProps) => {    
  
  return (
    <div className={styles.backdrop} onClick={handleClose}>{children}</div>
  )
}

export default ModalOverlay;