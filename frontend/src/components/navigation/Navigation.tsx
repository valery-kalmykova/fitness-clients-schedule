import styles from "./Navigation.module.css";
import ScheduleIcon from "../../assets/images/schedule-svg.svg";
import ClientsIcon from "../../assets/images/users-svg.svg";
import MoneyIcon from "../../assets/images/money-svg.svg";
import SettingsIcon from "../../assets/images/settings-svg.svg";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <ul className={styles.nav}>
      <li
        className={
          location.pathname == "/schedule"
            ? `${styles.navItem} ${styles.navItemActive}`
            : `${styles.navItem}`
        }
      >
        <Link to="/schedule">
          <img src={ScheduleIcon} />
          <span>Календарь</span>
        </Link>
      </li>
      <li
        className={
          location.pathname.includes("/clients")
            ? `${styles.navItem} ${styles.navItemActive}`
            : `${styles.navItem}`
        }
      >
        <Link to="/clients">
          <img src={ClientsIcon} />
          <span>Клиенты</span>
        </Link>
      </li>
      <li className={styles.navItem}>
        <a>
          <img src={MoneyIcon} />
          <span>Финансы</span>
        </a>
      </li>
      <li className={styles.navItem}>
        <a>
          <img src={SettingsIcon} />
          <span>Профиль</span>
        </a>
      </li>
    </ul>
  );
};

export default Navigation;
