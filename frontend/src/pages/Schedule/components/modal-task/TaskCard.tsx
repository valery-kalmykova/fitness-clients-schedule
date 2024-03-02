import styles from "./ModalTask.module.css";
import { convertToTime } from "../../../../utils/helpers";
import {
  useGetTaskQuery,
  useUpdateTaskMutation,
} from "../../../../store/apiSlice";
import { Spin } from "antd";
import FormEditTask from "../forms/task-edit/FormEditTask";
import { useAppSelector } from "../../../../utils/hooks/redux";
import SwitchAntd from "../../../../components/switch/SwitchAntd";

interface Props {
  eventId: string;
}

const TaskCard = ({ eventId }: Props) => {
  const editMode = useAppSelector((state) => state.modal.editMode);
  const [updateTask, { isLoading }] = useUpdateTaskMutation();
  const { data } = useGetTaskQuery(eventId);

  const hadleDoneChange = () => {
    let formData = {
      done: !data?.done,
    };
    updateTask({ formData, id: data?.id });
  };

  if (data && editMode) {
    return (
      <div className={styles.flexColumn}>
        <FormEditTask task={data} />
        {isLoading ? (
          <Spin />
        ) : (
          <SwitchAntd
            state={data.done}
            onChange={hadleDoneChange}
            trueText="Завершено"
            falseText="Не завершено"
          />
        )}
      </div>
    );
  } else if (data && !editMode) {
    return (
      <div className={styles.flexColumn}>
        <h2>{data.title}</h2>
        <p>{convertToTime(data.startDate)}</p>
        {isLoading ? (
          <Spin />
        ) : (
          data.comments.map((el: string, index: number) => {
            return <p key={index}>{el}</p>;
          })
        )}
        {isLoading ? (
          <Spin />
        ) : (
          <SwitchAntd
            state={data.done}
            onChange={hadleDoneChange}
            trueText="Завершено"
            falseText="Не завершено"
          />
        )}
      </div>
    );
  } else {
    return <Spin />;
  }
};

export default TaskCard;