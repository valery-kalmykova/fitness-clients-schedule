import styles from "./ClientList.module.css";
import MoreIcon from "../../../../assets/images/more-svg.svg";
import { Input } from "antd";
import { Client } from "../../../../utils/types";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../../../utils/context/context";
import { useEffect, useState } from "react";
import MainCardBody from "../../../../components/main-card-body/MainCardBody";
import {
  useLazyGetAllClientsQuery,
  useLazyGetArchivedClientsQuery,
} from "../../../../store/apiSlice";

interface Props {
  location: string;
}

const ClientList = ({ location }: Props) => {
  const navigate = useNavigate();
  const clientId = useParams();
  const { windowSize } = useAppContext();
  const [show, setShow] = useState<boolean>(true);
  const [filteredList, setFilteredList] = useState<Client[]>([]);

  const [getCurrentClients] = useLazyGetAllClientsQuery();
  const [getArchivedClients] = useLazyGetArchivedClientsQuery();
  const [clients, setClients] = useState<[] | null>(null);

  useEffect(() => {
    async function getCurrent() {
      await getCurrentClients(1)
        .then((res) => res.data)
        .then((data) => {
          setClients(data);
          setFilteredList(data);
        });
    }
    async function getArchive() {
      await getArchivedClients(1)
        .then((res) => res.data)
        .then((data) => {
          setClients(data);
          setFilteredList(data);
        });
    }
    if (location === "current") {
      getCurrent();
    }
    if (location === "archive") {
      getArchive();
    }
  }, [location]);

  useEffect(() => {
    if (windowSize < 768 && Object.keys(clientId).length > 0) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [clientId, windowSize]);

  function onSearch(value: string) {
    setFilteredList(
      filteredList.filter((client: Client) => {
        return client.name.toLowerCase().includes(value.toLowerCase());
      })
    );
  }

  function onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (event.target.value === "") {
      setFilteredList(clients!);
    }
    if (event.target.value.length >= 3) {
      onSearch(event.target.value);
    }
  }

  if (show && filteredList) {
    return (
      <MainCardBody flexGrow={1}>
        <Input.Search
          allowClear
          onChange={onChange}
          onSearch={onSearch}
          enterButton
          style={{
            maxWidth: 370,
            margin: "0 auto 20px",
            display: "block",
          }}
        />
        <ul className={styles.list}>
          {filteredList &&
            filteredList.map((el: Client) => {
              return (
                <li
                  className={styles.item}
                  key={el.id}
                  onClick={() => navigate(`/clients/${location}/${el.id}`)}
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
