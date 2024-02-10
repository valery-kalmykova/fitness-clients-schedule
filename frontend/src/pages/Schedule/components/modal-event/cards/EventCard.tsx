import styles from "./Card.module.css";
import { convertToTime } from "../../../../../utils/helpers";
import FormAddComment from "../../forms/comment-add/FormAddComment";
import SwitchDone from "../switch-done/SwitchDone";
import {
  useGetEventQuery,
  useUpdateEventMutation,
} from "../../../../../store/apiSlice";
import { Spin } from "antd";
import FormEditEvent from "../../forms/event-edit/FormEditEvent";
import { useAppSelector } from "../../../../../utils/hooks/redux";

interface Props {
  eventId: string;
}

const AbonementLine = ({abonement} : {abonement: string}) => {
  if (abonement === "abonement") {
    return <p>По абонементу</p>
  }
  if (abonement === "single") {
    return <p>Разовое занятие</p>
  }
  if (abonement === "free") {
    return <p>Вводное бесплатное</p>
  }
}

const EventCard = ({ eventId }: Props) => {
  const editMode = useAppSelector((state)=>state.modal.editMode);
  const [updateEvent, { isLoading }] = useUpdateEventMutation();
  const { data } = useGetEventQuery(eventId);

  const hadleDoneChange = () => {
    let formData={
      done: !data?.done
    }
    updateEvent({ formData, id: data?.id });
  };

  if (data && editMode) {
    return (
      <div className={styles.flexColumn}>
        <h2>{data.client.name}</h2>
        {editMode && <FormEditEvent event={data} />}
        {isLoading ? (
          <Spin />
        ) : (
          <SwitchDone state={data.done} onChange={hadleDoneChange} />
        )}
      </div>
    );
  } else if (data && !editMode) {
    return (
      <div className={styles.flexColumn}>
        <h2>{data.client.name}</h2>
        <div>
          <p>
            {convertToTime(data.startDate)} - {convertToTime(data.endDate)}
          </p>
        </div>
        <AbonementLine abonement={data.abonement} />
        {data.comments.map((el: string, index: number) => {
          return <p key={index}>{el}</p>;
        })}
        <FormAddComment id={data.id} currentComments={data.comments} type={data.type} />
        {isLoading ? (
          <Spin />
        ) : (
          <SwitchDone state={data.done} onChange={hadleDoneChange} />
        )}
      </div>
    );
  } else {
    return <Spin />;
  }
};

export default EventCard;
