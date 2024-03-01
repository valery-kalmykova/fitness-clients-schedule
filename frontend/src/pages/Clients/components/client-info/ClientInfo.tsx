import { useLocation, useNavigate } from "react-router-dom";
import MainCardBody from "../../../../components/main-card-body/MainCardBody";
import styles from "./ClientInfo.module.css";
import { useGetClientQuery } from "../../../../store/apiSlice";
import { Spin } from "antd";
import { getAge } from "../../../../utils/helpers";
import CloseIcon from "../../../../assets/images/close-svg.svg";
import { useAppContext } from "../../../../utils/context/context";
import EditIcon from "../../../../assets/images/edit-svg.svg";
import { useAppDispatch } from "../../../../utils/hooks/redux";
import { setModalEditClientIsOpen } from "../../../../store/modalSlice";
import Whatsapp from "../../../../assets/images/whatsapp-logo.svg";
import Telegram from "../../../../assets/images/telegram-logo.svg";
import SegmentedBlock from "../segmented-block/SegmentedBlock";

const ClientInfo = () => {
  const location = useLocation();
  const { data, isLoading } = useGetClientQuery(
    location.pathname.split("/")[3]
  );
  const { windowSize } = useAppContext();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setModalEditClientIsOpen(true));
  }

  if (isLoading) {
    return <Spin />;
  }

  if (data) {
    return (
      <MainCardBody flexGrow={4}>
        {windowSize < 768 && (
          <button
            className={styles.buttonBack}
            type="button"
            onClick={() => navigate(-1)}
          >
            <img src={CloseIcon} />
          </button>
        )}
        <button className={styles.buttonEdit} onClick={handleClick}>
          <img src={EditIcon} />
        </button>
        <div className={styles.blockContainer}>
          <div className={styles.blockContainerRow}>
            <h2>{data.name}</h2>
            <p className={styles.contactLine}>
              <span>
                <a href={`tel:${data.phone.slice(1)}`}>{data.phone}</a>
              </span>
              <span>
                <a href={`https://wa.me/${data.phone.slice(1)}`}>
                  <img className={styles.contactLogo} src={Whatsapp} />
                </a>
              </span>
              <span>
                <a href={`https://t.me/${data.phone}`}>
                  <img className={styles.contactLogo} src={Telegram} />
                </a>
              </span>
            </p>
          </div>
        </div>
        <div className={styles.blockContainer}>
          <div className={styles.blockContainerRow}>
            <h3>Возраст:</h3>
            {data.age ? <p>{getAge(data.age)} г</p> : <p>-</p>}
          </div>
          <div className={styles.blockContainerRow}>
            <h3>Вес:</h3>
            {data.weight ? <p>{data.weight} кг</p> : <p>-</p>}
          </div>
        </div>
        <div className={styles.blockContainer}>
          <div className={styles.blockContainerRow}>
            <h3>Состояние здоровья:</h3>
            <p>{data.health}</p>
          </div>
        </div>
        {data.workoutList && <SegmentedBlock workoutList={data.workoutList} />}
      </MainCardBody>
    );
  }
};

export default ClientInfo;
