import styles from "./ClientList.module.css";
import MoreIcon from "../../../../assets/images/more-svg.svg";
import { useGetAllClientsQuery } from "../../../../store/apiSlice";
import { Spin } from "antd";
import { Client } from "../../../../utils/types";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../../../utils/context/context";
import { useEffect, useState } from "react";
import MainCardBody from "../../../../components/main-card-body/MainCardBody";

const ClientList = () => {
  const { data, isLoading } = useGetAllClientsQuery(1);
  const navigate = useNavigate();
  const clientId = useParams();
  const { windowSize } = useAppContext();
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    if (windowSize < 768 && Object.keys(clientId).length > 0) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [clientId, windowSize]);

  if (isLoading) {
    return <Spin />;
  }

  if (show) {
    return (
      <MainCardBody flexGrow={1}>
        <ul className={styles.list}>
          {data &&
            data.map((el: Client) => {
              return (
                <li
                  className={styles.item}
                  key={el.id}
                  onClick={() => navigate(`/clients/${el.id}`)}
                >
                  <div
                    className={styles.userImg}
                    style={{ backgroundColor: el.color }}
                  >{`${el.name.split(" ")[0].charAt(0)}${el.name
                    .split(" ")[1]
                    .charAt(0)}`}</div>
                  <div className={styles.itemText}>
                    <p>{el.name}</p>
                    <p>{el.phone}</p>
                  </div>
                  <img src={MoreIcon} className={styles.itemImg} />
                </li>
              );
            })}
        </ul>
      </MainCardBody>
    );
  }
};

export default ClientList;
