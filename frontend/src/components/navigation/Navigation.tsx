import styles from "./Navigation.module.css";
import ScheduleIcon from "../../assets/images/schedule-svg.svg";
import ClientsIcon from "../../assets/images/users-svg.svg";
import MoneyIcon from "../../assets/images/money-svg.svg";
import SettingsIcon from "../../assets/images/settings-svg.svg";

const Navigation = () => {
  return (
    <ul className={styles.nav}>
      <li className={`${styles.navItem} ${styles.navItemActive}`}>
        <a><img src={ScheduleIcon} /><span>Календарь</span></a>
      </li>
      <li className={styles.navItem}>
        <a><img src={ClientsIcon} /><span>Клиенты</span></a>
      </li>
      <li className={styles.navItem}>
        <a><img src={MoneyIcon} /><span>Финансы</span></a>
      </li>
      <li className={styles.navItem}>
        <a><img src={SettingsIcon} /><span>Профиль</span></a>
      </li>
    </ul>
  );
};

export default Navigation;
