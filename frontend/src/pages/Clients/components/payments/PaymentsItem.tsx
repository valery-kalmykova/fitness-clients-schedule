import { PAYMENT_TYPE } from "../../../../utils/types";
import styles from "./payments.module.css";
import EditIcon from "../../../../assets/images/edit-svg.svg";
import RemoveIcon from "../../../../assets/images/trash.svg";
import { useState } from "react";
import { Popconfirm } from "antd";
import PaymentEdit from "../forms/payment-edit/PaymentEdit";
import { useDeleteClientPaymentbyIdMutation } from "../../../../store/apiSlice";

interface Props {
  item: any;
}

const PaymentsItem = ({ item }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [deletePayment] = useDeleteClientPaymentbyIdMutation();

  function handleDelete() {
    deletePayment(item.id);
  }

  return (
    <div className={styles.listItem}>
      <span>
        {item.type === PAYMENT_TYPE.expense ? "Списание" : "Пополнение"}:{" "}
      </span>
      {edit ? (
        <PaymentEdit item={item} setEdit={setEdit} />
      ) : (
        <span>
          {new Date(item.date).toLocaleDateString()} - {item.amount} руб.
        </span>
      )}
      {item.type === PAYMENT_TYPE.income && (
        <>
          <button className={styles.button} onClick={() => setEdit(!edit)}>
            <img src={EditIcon} />
          </button>
          <Popconfirm
            trigger="click"
            title="Точно удаляем?"
            onConfirm={handleDelete}
            cancelText="Отмена"
          >
            <button className={styles.button}>
              <img src={RemoveIcon} />
            </button>
          </Popconfirm>
        </>
      )}
    </div>
  );
};

export default PaymentsItem;
