import styles from "./ModalEvent.module.css";
import { convertToTime } from "../../../../utils/helpers";
import {
  useAddClientPaymentMutation,
  useDeleteClientPaymentMutation,
  useGetEventQuery,
  useUpdateEventMutation,
} from "../../../../store/apiSlice";
import { Spin, notification } from "antd";
import FormEditEvent from "../forms/event-edit/FormEditEvent";
import { useAppSelector } from "../../../../utils/hooks/redux";
import FormEditEventRegular from "../forms/event-edit/FormEditEventRegular";
import { PAYMENT_AMOUNT, PAYMENT_TYPE } from "../../../../utils/types";
import { Link } from "react-router-dom";
import SwitchAntdwithConfirm from "../../../../components/switch/SwitchAntdwithConfirm";
import SwitchAntd from "../../../../components/switch/SwitchAntd";

interface Props {
  eventId: string;
}

const AbonementLine = ({ abonement }: { abonement: string }) => {
  if (abonement === "abonement") {
    return <p>По абонементу</p>;
  }
  if (abonement === "single") {
    return <p>Разовое занятие</p>;
  }
  if (abonement === "free") {
    return <p>Вводное бесплатное</p>;
  }
};

const EventCard = ({ eventId }: Props) => {
  const editMode = useAppSelector((state) => state.modal.editMode);
  const [updateEvent] = useUpdateEventMutation();
  const [addPayment] = useAddClientPaymentMutation();
  const [deletePayment] = useDeleteClientPaymentMutation();
  const { data } = useGetEventQuery(eventId);
  const editRelatedId = useAppSelector((state) => state.modal.relatedId);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.info({
      message: "Необходимо произвести оплату",
      description:
        "У клиента закончился предоплаченный абонемент или завершено разовое занятие. Напомните ему о необходимости произвести оплату",
    });
  };

  const hadleDoneChange = async () => {
    let formData = {
      done: !data?.done,
    };
    if (data.done === false) {
      let formDataPay = {
        amount:
          data.abonement === "abonement"
            ? PAYMENT_AMOUNT.abonement
            : PAYMENT_AMOUNT.single,
        date: data.startDate,
        type: PAYMENT_TYPE.expense,
        clientId: data.client.id,
      };
      try {
        const res: any = await addPayment(formDataPay);
        await updateEvent({ formData, id: data?.id });
        if (res.data.totalIncomes <= res.data.totalExpenses) {
          openNotification();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      let formDataPay = {
        amount:
          data.abonement === "abonement"
            ? PAYMENT_AMOUNT.abonement
            : PAYMENT_AMOUNT.single,
        date: data.startDate,
      };
      try {
        await deletePayment(formDataPay);
        await updateEvent({ formData, id: data?.id });
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (data && editMode) {
    return (
      <>
        {contextHolder}
        <div className={styles.flexColumn}>
          <Link
            to={`/clients/current/${data.client.id}`}
            className={styles.eventTitle}
          >
            {data.client.name}
          </Link>
          {!editRelatedId ? (
            <>
              <FormEditEvent event={data} />
              {data.abonement !== "free" ? (
                <SwitchAntdwithConfirm
                  state={data.done}
                  onChange={hadleDoneChange}
                  trueText="Завершено"
                  falseText="Не завершено"
                  title={
                    data.done === true
                      ? "Отменить списание оплаты за тренировку?"
                      : "Списать оплату за тренировку?"
                  }
                />
              ) : (
                <SwitchAntd
                  state={data.done}
                  onChange={hadleDoneChange}
                  trueText="Завершено"
                  falseText="Не завершено"
                />
              )}
            </>
          ) : (
            <FormEditEventRegular event={data} />
          )}
        </div>
      </>
    );
  } else if (data && !editMode) {
    return (
      <>
        {contextHolder}
        <div className={styles.flexColumn}>
          <Link
            to={`/clients/current/${data.client.id}`}
            className={styles.eventTitle}
          >
            {data.client.name}
          </Link>
          <div>
            <p>
              {convertToTime(data.startDate)} - {convertToTime(data.endDate)}
            </p>
          </div>
          <AbonementLine abonement={data.abonement} />
          {data.comments.map((el: string, index: number) => {
            return <p key={index}>{el}</p>;
          })}
          {data.abonement !== "free" ? (
            <SwitchAntdwithConfirm
              state={data.done}
              onChange={hadleDoneChange}
              trueText="Завершено"
              falseText="Не завершено"
              title={
                data.done === true
                  ? "Отменить списание оплаты за тренировку?"
                  : "Списать оплату за тренировку?"
              }
            />
          ) : (
            <SwitchAntd
              state={data.done}
              onChange={hadleDoneChange}
              trueText="Завершено"
              falseText="Не завершено"
            />
          )}
        </div>
      </>
    );
  } else {
    return <Spin />;
  }
};

export default EventCard;
