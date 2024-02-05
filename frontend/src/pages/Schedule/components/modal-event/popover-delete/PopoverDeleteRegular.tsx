import { Popconfirm, Radio, Space } from "antd";
import type { RadioChangeEvent } from "antd";
import { useState } from "react";
import styles from "./PopoverDelete.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../utils/hooks/redux";
import {
  useDeleteAllFutureRelatedMutation,
  useDeleteAllRelatedMutation,
  useDeleteEventMutation,
} from "../../../../../store/apiSlice";
import {
  setEventId,
  setModalEventInfoIsOpen,
} from "../../../../../store/modalSlice";
import DeleteIcon from "../../../../../assets/images/delete-svg.svg";

interface Props {
  relatedId: string
}

const PopoverDeleteRegular = ({relatedId}: Props) => {
  const dispatch = useAppDispatch();
  const eventId = useAppSelector((state) => state.modal.eventId);
  const [deleteEvent, { isLoading }] = useDeleteEventMutation();
  const [deleteAllRelated] = useDeleteAllRelatedMutation();
  const [deleteAllFutureRelated] = useDeleteAllFutureRelatedMutation();
  const [value, setValue] = useState(1);

  function onChange(e: RadioChangeEvent) {
    setValue(e.target.value);
  }

  function handleDelete() {
    if (value === 1) {
      deleteEvent(eventId);
    }
    if (value === 2) {
      deleteAllFutureRelated({ id: eventId, relatedId: relatedId });
    }
    if (value === 3) {
      deleteAllRelated(relatedId);
    }
    handleClose();
  }
  function handleClose() {
    dispatch(setModalEventInfoIsOpen(false));
    dispatch(setEventId(null));
  }

  const description = () => {
    return (
      <div className={styles.popoverContainer}>
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            <Radio value={1}>Только эту тренировку</Radio>
            <Radio value={2}>Эту и последующие</Radio>
            <Radio value={3}>Все тренировки</Radio>
          </Space>
        </Radio.Group>
      </div>
    );
  };

  return (
    <Popconfirm
      description={description}
      trigger="click"
      title="Удаление посторяющейся тренировки"
      onConfirm={handleDelete}
    >
      <button className={styles.button}>
        <img src={DeleteIcon} />
      </button>
    </Popconfirm>
  );
};

export default PopoverDeleteRegular;
