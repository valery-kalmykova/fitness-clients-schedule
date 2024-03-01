import { useLocation } from "react-router-dom";
import { useGetAllClientPaymentsQuery } from "../../../../store/apiSlice";
import PaymentAdd from "../forms/payment-add/PaymentAdd";
import styles from "./payments.module.css";
import { useEffect, useState } from "react";
import { PAYMENT_TYPE } from "../../../../utils/types";
import PaymentsItem from "./PaymentsItem";

const Payments = () => {
  const location = useLocation();
  const { data } = useGetAllClientPaymentsQuery(
    location.pathname.split("/")[3]
  );
  const [total, setTotal] = useState<number>(0);
  const [list, setList] = useState<any[] | null>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const totalIncoming = data
        .filter((item: any) => item.type === PAYMENT_TYPE.income)
        .reduce((acc: number, item: any) => acc + Number(item.amount), 0);
      const totalExpense = data
        .filter((item: any) => item.type === PAYMENT_TYPE.expense)
        .reduce((acc: number, item: any) => acc + Number(item.amount), 0);
      setTotal(totalIncoming - totalExpense);
      const sortedData = [...data].sort(function (a: any, b: any) {
        return new Date(b.date).valueOf() - new Date(a.date).valueOf();
      });
      setList(sortedData);
    }
  }, [data]);

  return (
    <>
      <PaymentAdd />
      {list && data.length > 0 && (
        <>
          <p className={styles.total}>
            Остаток средств:{" "}
            <b>
              {total < 0 ? (
                <span style={{ color: "#e7242d" }}>{total} руб.</span>
              ) : (
                `${total} руб.`
              )}
            </b>
          </p>
          <ul className={styles.list}>
            {list.map((item: any) => {
              return (
                <li key={item.id}>
                  <PaymentsItem item={item} />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
};

export default Payments;
