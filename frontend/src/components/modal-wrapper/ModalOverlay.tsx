import styles from './Modal.module.css';

interface ModalOverlayProps {  
  handleClose: () => void
}

const ModalOverlay = ({handleClose}: ModalOverlayProps) => {    
  
  return (
    <div className={styles.backdrop} onClick={handleClose}></div>
  )
}

export default ModalOverlay;