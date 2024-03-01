import { Link, useLocation } from "react-router-dom";
import styles from "./Navigation.module.css";

const SubMenuClents = () => {
  const location = useLocation();
  return (
    <div className={styles.subMenu}>
      <Link
        to="/clients/current"
        className={
          location.pathname.includes("/current")
            ? styles.subMenuActive
            : styles.subMenuInActive
        }
      >
        Текущие
      </Link>
      <Link
        to="/clients/archive"
        className={
          location.pathname.includes("/archive")
            ? styles.subMenuActive
            : styles.subMenuInActive
        }
      >
        Архив
      </Link>
    </div>
  );
};

export default SubMenuClents;
