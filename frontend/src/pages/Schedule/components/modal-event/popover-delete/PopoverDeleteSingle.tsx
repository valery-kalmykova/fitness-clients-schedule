import { Popconfirm } from "antd";
import styles from "./PopoverDelete.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../utils/hooks/redux";
import { useDeleteEventMutation, useDeleteTaskMutation } from "../../../../../store/apiSlice";
import {
  setEventId,
  setModalEventInfoIsOpen,
  setModalTaskInfoIsOpen,
} from "../../../../../store/modalSlice";
import DeleteIcon from "../../../../../assets/images/delete-svg.svg";
import { EVENT_TYPE } from "../../../../../utils/types";

interface Props {
  type: EVENT_TYPE
}

const PopoverDeleteSingle = ({type}: Props) => {
  const dispatch = useAppDispatch();
  const eventId = useAppSelector((state) => state.modal.eventId);
  const [deleteEvent, { isLoading }] = useDeleteEventMutation();
  const [deleteTask] = useDeleteTaskMutation();

  function handleDelete() {
    if (type === EVENT_TYPE.event) {
      deleteEvent(eventId);
    }
    if (type === EVENT_TYPE.task) {
      deleteTask(eventId);
    }
    handleClose();
  }
  function handleClose() {
    dispatch(setModalEventInfoIsOpen(false));
    dispatch(setModalTaskInfoIsOpen(false));
    dispatch(setEventId(null));
  }

  return (
    <Popconfirm
      trigger="click"
      title="Точно удаляем?"
      onConfirm={handleDelete}
    >
      <button className={styles.button}>
        <img src={DeleteIcon} />
      </button>
    </Popconfirm>
  );
};

export default PopoverDeleteSingle;
