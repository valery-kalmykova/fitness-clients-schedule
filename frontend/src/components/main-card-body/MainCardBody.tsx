import { ReactNode } from "react";
import styles from "./MainCardBody.module.css";

interface Props {
  children: ReactNode;
  flexGrow: number;
  maxWidth?: string;
}

const MainCardBody = ({ children, flexGrow, maxWidth }: Props) => {
  return <div style={{flexGrow: flexGrow, maxWidth: maxWidth}} className={styles.cardBody}>{children}</div>;
};

export default MainCardBody;
