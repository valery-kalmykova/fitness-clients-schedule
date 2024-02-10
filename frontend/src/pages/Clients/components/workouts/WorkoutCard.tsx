import { useUpdateEventMutation } from "../../../../store/apiSlice";
import { Event } from "../../../../utils/types";
import styles from "./workouts.module.css";
import { Button, Form, Input } from "antd";
import EditIcon from "../../../../assets/images/edit-svg.svg"
import { useAppDispatch } from "../../../../utils/hooks/redux";
import { setEditMode, setEventId, setModalEventInfoIsOpen } from "../../../../store/modalSlice";

interface Props {
  event: Event;
}

const WorkoutCard = ({ event }: Props) => {
  const [updateEvent, { isLoading }] = useUpdateEventMutation();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const dispatch = useAppDispatch();

  function onFinish(values: any) {
    let comments: string[] = [];
    if (event?.comments.length == 0) {
      comments.push(values.comment);
    } else {
      comments.push(...event!.comments);
      comments.push(values.comment);
    }
    updateEvent({ comments: comments, id: event?.id });
    form.resetFields();
  }

  function handleClick() {
    dispatch(setModalEventInfoIsOpen(true));
    dispatch(setEditMode(true));
    dispatch(setEventId(event.id));
  }

  return (
    <li className={`${styles.flexColumn} ${styles.workoutCard}`}>
      <button className={styles.buttonEdit} onClick={handleClick}>
        <img src={EditIcon} />
      </button>
      <div className={styles.blockContainer}>
        <div className={styles.blockContainerRow}>
          <h4>Дата:</h4>
          <p>{new Date(event.startDate).toLocaleDateString()}</p>
        </div>
        <div className={styles.blockContainerRow}>
          <h4>Время:</h4>
          <p>{new Date(event.startDate).toLocaleTimeString().slice(0, 5)}</p>
        </div>
      </div>
      <div className={styles.flexColumn}>
        <h4 className={styles.blockTitle}>Комментарии:</h4>
        <ul>
          {event.comments.map((el: string, index: number) => {
            return <li key={index}>{el}</li>;
          })}
        </ul>
      </div>
      <div style={{ flexGrow: "1", width: "100%" }}>
        <Form
          layout="inline"
          form={form}
          onFinish={onFinish}
          name={`comment-${event.id}`}
          style={{ width: "100%" }}
          autoComplete="off"
        >
          <Form.Item style={{ flexGrow: "1" }} name="comment">
            <TextArea />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ height: "42px", width: "142px", marginTop: "5px" }}
            >
              Добавить
            </Button>
          </Form.Item>
        </Form>
      </div>
    </li>
  );
};

export default WorkoutCard;
