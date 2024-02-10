import { ReactNode } from "react";
import styles from "./FormWrapper.module.css";

interface Props {
  children: ReactNode,
}

const FormsWrapperClients = ({children}: Props) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

export default FormsWrapperClients;
