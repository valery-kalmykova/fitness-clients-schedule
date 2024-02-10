import { useLocation, useNavigate } from "react-router-dom";
import MainCardBody from "../../../../components/main-card-body/MainCardBody";
import WorkputList from "../workouts/WorkoutList";
import styles from "./ClientInfo.module.css";
import { useGetClientQuery } from "../../../../store/apiSlice";
import { Spin } from "antd";
import { getAge } from "../../../../utils/helpers";
import CloseIcon from "../../../../assets/images/close-svg.svg";
import { useAppContext } from "../../../../utils/context/context";
import EditIcon from "../../../../assets/images/edit-svg.svg"
import { useAppDispatch } from "../../../../utils/hooks/redux";
import { setModalEditClientIsOpen } from "../../../../store/modalSlice";

const ClientInfo = () => {
  const location = useLocation();
  const { data, isLoading } = useGetClientQuery(
    location.pathname.split("/")[2]
  );
  const { windowSize } = useAppContext();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setModalEditClientIsOpen(true))
    console.log("jjj")
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
            <p>{data.phone}</p>
          </div>
        </div>
        <div className={styles.blockContainer}>
          <div className={styles.blockContainerRow}>
            <h3>Возраст:</h3>
            <p>{getAge(data.age)} лет</p>
          </div>
          <div className={styles.blockContainerRow}>
            <h3>Вес:</h3>
            <p>{data.weight} кг</p>
          </div>
        </div>
        <div className={styles.blockContainer}>
          <div className={styles.blockContainerRow}>
            <h3>Состояние здоровья:</h3>
            <p>{data.health}</p>
          </div>
        </div>
        {data.workoutList && <WorkputList workoutList={data.workoutList} />}
      </MainCardBody>
    );
  }
};

export default ClientInfo;
