import { Form, Select, Space } from "antd";
import type { Color } from "antd/es/color-picker";
import {
  optionsAbonement,
  optionsWeekDays,
  timeIntervals,
} from "../../../../../utils/constants";
import { useEffect, useState } from "react";
import { Event, RELATED_TYPE } from "../../../../../utils/types";
import { convertToTime } from "../../../../../utils/helpers";
import {
  useUpdateAllFutureRelatedMutation,
  useUpdateAllRelatedMutation,
} from "../../../../../store/apiSlice";
import ColorPickerAntd from "../../../../../components/form-fields/ColorPickerAntd";
import ButtonSubmitAntd from "../../../../../components/form-fields/ButtonSubmitAntd";
import TimeStartSelectAntd from "../../../../../components/form-fields/TimeStartSelectAntd";
import TimeEndSelectAntd from "../../../../../components/form-fields/TimeEndSelectAntd";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../utils/hooks/redux";
import { setEditMode, setRelatedId } from "../../../../../store/modalSlice";

interface Props {
  event: Event;
}

interface InitialType {
  startTime: number | undefined;
  endTime: number | undefined;
  abonement: number | undefined;
  weekDay: number | undefined;
}

interface formData {
  abonement?: string;
  color?: string;
  startHours?: number;
  startMinutes?: number;
  endHours?: number;
  endMinutes?: number;
  weekDay?: number;
}

const FormEditEventRegular = ({ event }: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [updateAllRelated] = useUpdateAllRelatedMutation();
  const [updateAllFutureRelated] = useUpdateAllFutureRelatedMutation();
  const relatedId = useAppSelector((state) => state.modal.relatedId);
  const [time, setTime] = useState<string>("");
  const [color, setColor] = useState<Color | string>(event.color);
  const [initialValues, setInitialValues] = useState<InitialType | null>(null);

  useEffect(() => {
    const startTime = convertToTime(event.startDate);
    const endTime = convertToTime(event.endDate);
    let startTimeI;
    let endTimeI;
    let abonementI;
    for (let i = 0; i < timeIntervals.length; i++) {
      if (timeIntervals[i].label === startTime) {
        startTimeI = i;
        setTime(timeIntervals[i].value);
      }
    }
    for (let i = 0; i < timeIntervals.length; i++) {
      if (timeIntervals[i].label === endTime) {
        endTimeI = i;
      }
    }
    for (let i = 0; i < optionsAbonement.length; i++) {
      if (optionsAbonement[i].value == event.abonement) {
        abonementI = i;
      }
    }
    const weekDay = new Date(event.startDate).getDay();
    setInitialValues({
      startTime: startTimeI,
      endTime: endTimeI,
      abonement: abonementI,
      weekDay: weekDay,
    });
  }, []);

  function onFinish(values: any) {
    let formData: formData = {};
    if (values.weekDay !== initialValues!.weekDay) {
      formData.weekDay = values.weekDay;
    }
    if (values.timeStart !== timeIntervals[initialValues!.startTime!].value) {
      const startHours = new Date(values.timeStart).getHours();
      const startMinutes = new Date(values.timeStart).getMinutes();
      formData.startHours = startHours;
      formData.startMinutes = startMinutes;
    }
    if (values.timeEnd !== timeIntervals[initialValues!.endTime!].value) {
      const endHours = new Date(values.timeEnd).getHours();
      const endMinutes = new Date(values.timeEnd).getMinutes();
      formData.endHours = endHours;
      formData.endMinutes = endMinutes;
    }
    if (
      values.abonement !== optionsAbonement[initialValues!.abonement!].value
    ) {
      formData.abonement = values.abonement;
    }
    if (typeof values.color !== "string") {
      formData.color = values.color.metaColor.originalInput;
    }

    if (relatedId?.type === RELATED_TYPE.future) {
      updateAllFutureRelated({
        formData,
        relatedId: event.related_to,
        id: event.id,
      });
    }
    if (relatedId?.type === RELATED_TYPE.all) {
      updateAllRelated({
        formData,
        relatedId: event.related_to,
        id: event.id,
      });
    }
    dispatch(setEditMode(false));
    dispatch(setRelatedId(null));
  }

  if (initialValues) {
    return (
      <Form
        layout="vertical"
        form={form}
        name="edit-event"
        onFinish={onFinish}
        style={{ width: "100%" }}
        initialValues={{
          weekDay: initialValues.weekDay,
          timeStart: timeIntervals[initialValues.startTime!].value,
          timeEnd: timeIntervals[initialValues.endTime!].value,
          abonement: optionsAbonement[initialValues.abonement!].value,
          color: event.color,
        }}
      >
        <Form.Item
          name="weekDay"
          rules={[{ required: true, message: "Обязательное поле" }]}
          label={
            <label style={{ color: "#6c7293" }}>Повторять еженедельно</label>
          }
        >
          <Select options={optionsWeekDays} />
        </Form.Item>
        <Space wrap>
          <TimeStartSelectAntd
            rules={{ required: true, message: "Обязательное поле" }}
            setTime={setTime}
            label="Начало"
          />
          <TimeEndSelectAntd startTime={time} label="Окончание" />
        </Space>
        <Form.Item
          name="abonement"
          rules={[{ required: true }]}
          label={<label style={{ color: "#6c7293" }}>Оплата</label>}
        >
          <Select options={optionsAbonement} />
        </Form.Item>
        {/* <Form.Item
            name="comment"
            label={
              <label style={{ color: "#6c7293" }}>Комментарий ко всем</label>
            }
          >
            <Input.TextArea />
          </Form.Item> */}
        <ColorPickerAntd color={color} setColor={setColor} />
        <ButtonSubmitAntd />
      </Form>
    );
  }
};

export default FormEditEventRegular;
