import Navigation from "../navigation/Navigation";
import styles from "./Aside.module.css";

const Aside = () => {
  return (
    <aside className={styles.aside}>
      <Navigation />
    </aside>
  );
};

export default Aside;
