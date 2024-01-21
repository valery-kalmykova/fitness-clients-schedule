import styles from "./MainPanel.module.css";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MainPanel = ({ children }: Props) => {
  return (
    <div className={styles.mainPanel}>
      <div className={styles.containerWrapper}>{children}</div>
    </div>
  );
};

export default MainPanel;
