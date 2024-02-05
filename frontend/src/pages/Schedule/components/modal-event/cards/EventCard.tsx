import styles from "./Card.module.css";
import { convertToTime } from "../../../../../utils/helpers";
import FormAddComment from "../form-add-comment/FormAddComment";
import SwitchDone from "../switch-done/SwitchDone";
import {
  useGetEventQuery,
  useUpdateEventMutation,
} from "../../../../../store/apiSlice";
import { Spin } from "antd";

interface Props {
  eventId: string;
}

const EventCard = ({ eventId }: Props) => {
  const [updateEvent, { isLoading }] = useUpdateEventMutation();
  const { data } = useGetEventQuery(eventId);

  const onFinish = (values: any) => {
    let comments: string[] = [];
    if (data?.comments.length == 0) {
      comments.push(values.comment);
    } else {
      comments.push(...data!.comments);
      comments.push(values.comment);
    }
    updateEvent({ comments: comments, id: data?.id });
  };

  const hadleDoneChange = () => {
    updateEvent({ done: !data?.done, id: data?.id });
  };

  if (data) {
    return (
      <div className={styles.flexColumn}>
        <h2>{data.client.name}</h2>
        <div>
          <p>
            {convertToTime(data.startDate)} - {convertToTime(data.endDate)}
          </p>
        </div>
        {isLoading ? (
          <Spin />
        ) : (
          data.comments.map((el: string, index: number) => {
            return <p key={index}>{el}</p>;
          })
        )}
        <FormAddComment onFinish={onFinish} />
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
