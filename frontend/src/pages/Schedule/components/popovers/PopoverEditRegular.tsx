import { Popconfirm, Radio, Space } from "antd";
import type { RadioChangeEvent } from "antd";
import { useState } from "react";
import styles from "./PopoverDelete.module.css";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks/redux";
import {
  setEditMode,
  setEventId,
  setModalEventInfoIsOpen,
  setRelatedId,
} from "../../../../store/modalSlice";
import EditIcon from "../../../../assets/images/edit-svg.svg";
import { RELATED_TYPE } from "../../../../utils/types";

interface Props {
  relatedId: string;
  clickedId: string;
}

const PopoverEditRegular = ({ relatedId, clickedId }: Props) => {
  const dispatch = useAppDispatch();
  const editMode = useAppSelector((state) => state.modal.editMode);
  const [value, setValue] = useState(1);
  const isOpenNodal = useAppSelector((state) => state.modal.isOpenEventInfo);

  function onChange(e: RadioChangeEvent) {
    setValue(e.target.value);
  }

  function handleChange() {
    if (!isOpenNodal) {
      dispatch(setModalEventInfoIsOpen(true));
      dispatch(setEventId(clickedId));
    }
    if (value === 1) {
      dispatch(setEditMode(!editMode));
    }
    if (value === 2) {
      dispatch(setEditMode(!editMode));
      dispatch(setRelatedId({ id: relatedId, type: RELATED_TYPE.future }));
    }
    if (value === 3) {
      dispatch(setEditMode(!editMode));
      dispatch(setRelatedId({ id: relatedId, type: RELATED_TYPE.all }));
    }
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
      title="Редактировать повторяющуюся тренировку"
      onConfirm={handleChange}
      cancelText="Отмена"
    >
      <button className={styles.button}>
        <img src={EditIcon} />
      </button>
    </Popconfirm>
  );
};

export default PopoverEditRegular;
