import styles from "./Navigation.module.css";
import ScheduleIcon from "../../assets/images/schedule-svg.svg";
import ClientsIcon from "../../assets/images/users-svg.svg";
import MoneyIcon from "../../assets/images/money-svg.svg";
import SettingsIcon from "../../assets/images/settings-svg.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../utils/context/context";
import MenuItemWithPopover from "./PopoverSubMenu";
import SubMenuClents from "./SubMenuClients";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { windowSize } = useAppContext();

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
      <li className={styles.withSubMenu}>
        {windowSize < 768 ? (
          <MenuItemWithPopover content={SubMenuClents}>
            <div
              className={
                location.pathname.includes("/clients")
                  ? `${styles.navItem} ${styles.navItemActive}`
                  : `${styles.navItem}`
              }
            >
              <img src={ClientsIcon} />
              <span>Клиенты</span>
            </div>
          </MenuItemWithPopover>
        ) : (
          <>
            <div
              className={
                location.pathname.includes("/clients")
                  ? `${styles.navItem} ${styles.navItemActive}`
                  : `${styles.navItem}`
              }
              onClick={() => navigate("/clients/current")}
            >
              <img src={ClientsIcon} />
              <span>Клиенты</span>
            </div>
            <SubMenuClents />
          </>
        )}
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
