import styles from "./EventCard.module.css";
import { EVENT_TYPE, Event } from "../../../utils/constants";
import { convertToTime } from "../../../utils/helpers";
import FormAddComment from "../form-add-comment/FormAddComment";
import SwitchDone from "../switch-done/SwitchDone";
import { useUpdateEventMutation } from "../../../store/apiSlice";
import { Spin } from "antd";

interface Props {
  event: Event | null;
}

const EventCard = ({ event }: Props) => {
  const [updateEvent, { isLoading }] = useUpdateEventMutation();

  const onFinish = (values: any) => {
    let comment: string[] = [];
    if (event?.comment.length == 0) {
      comment.push(values.comment)
    } else {
      comment.push(...event!.comment);
      comment.push(values.comment);
    }
    const id = event?.id;
    updateEvent({ data: {comment}, id });
  };

  const hadleDoneChange = () => {
    const data = { done: !event?.done };
    const id = event?.id;
    updateEvent({ data, id });
  };

  if (event) {
    return (
      <div>
        <h2>{event.title}</h2>
        {event.type == EVENT_TYPE.event ? (
          <p>
            {convertToTime(event.startDate)} - {convertToTime(event.endDate)}
          </p>
        ) : (
          <p>{convertToTime(event.startDate)}</p>
        )}
        <p>{event.description}</p>
        {isLoading ? (
          <Spin />
        ) : (
          event.comment && event.comment.map((el: string, index: number) => {
            return <p key={index}>{el}</p>;
          })
        )}
        <FormAddComment onFinish={onFinish} />
        {isLoading ? (
          <Spin />
        ) : (
          <SwitchDone state={event.done} onChange={hadleDoneChange} />
        )}
      </div>
    );
  } else {
    return <Spin />;
  }
};

export default EventCard;
