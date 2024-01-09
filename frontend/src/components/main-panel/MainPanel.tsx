import { ReactNode } from "react";
import styles from "./MainPanel.module.css";

interface Props {
  children: ReactNode;
}

const MainPanel = ({ children }: Props) => {
  return (
    <div className={styles.mainPanel}>
      <div className={styles.containerWrapper}>
        <div className={styles.cardBody}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainPanel;
