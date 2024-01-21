import styles from "./ClientList.module.css";
import MoreIcon from "../../../../assets/images/more-svg.svg";
import { useGetAllClientsQuery } from "../../../../store/apiSlice";
import { Spin } from "antd";

const ClientList = () => {
  const { data, isLoading } = useGetAllClientsQuery(1);

  if (isLoading) {
    return <Spin />;
  }

  return (
    <ul className={styles.list}>
      {data &&
        data.map((el: any) => {
          return (
            <li className={styles.item} key={el.id}>
              <div
                className={styles.userImg}
                style={{ backgroundColor: el.color }}
              >{`${el.name.split(" ")[0].at(0)}${el.name
                .split(" ")[1]
                .at(0)}`}</div>
              <div className={styles.itemText}>
                <p>{el.name}</p>
                <p>{el.phone}</p>
              </div>
              <img src={MoreIcon} className={styles.itemImg} />
            </li>
          );
        })}
    </ul>
  );
};

export default ClientList;
