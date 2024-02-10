import { ConfigProvider, DatePicker, Form, Input, Select, Space } from "antd";
import type { Color } from "antd/es/color-picker";
import {
  optionsAbonement,
  timeIntervals,
} from "../../../../../utils/constants";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import locale from "antd/locale/ru_RU";
import "dayjs/locale/ru";
import dayjs from "dayjs";
import { Event } from "../../../../../utils/types";
import { convertToTime } from "../../../../../utils/helpers";
import { useUpdateEventMutation } from "../../../../../store/apiSlice";
import ColorPickerAntd from "../../../../../components/form-fields/ColorPickerAntd";
import ButtonSubmitAntd from "../../../../../components/form-fields/ButtonSubmitAntd";
import TimeStartSelectAntd from "../../../../../components/form-fields/TimeStartSelectAntd";
import TimeEndSelectAntd from "../../../../../components/form-fields/TimeEndSelectAntd";
import { useAppDispatch } from "../../../../../utils/hooks/redux";
import { setEditMode } from "../../../../../store/modalSlice";

interface Props {
  event: Event;
}

interface InitialType {
  startTime: number | undefined;
  endTime: number | undefined;
  abonement: number | undefined;
}

const FormEditEvent = ({ event }: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [updateEvent, { isLoading }] = useUpdateEventMutation();
  const [time, setTime] = useState<string>("");
  const [comments, setComments] = useState<string[]>([]);
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
    setInitialValues({
      startTime: startTimeI,
      endTime: endTimeI,
      abonement: abonementI,
    });
    setComments(event.comments);
  }, []);

  function onFinish(values: any) {
    const startHours = new Date(values.timeStart).getHours();
    const startMinutes = new Date(values.timeStart).getMinutes();
    const startDate = new Date(values.date).setHours(
      startHours,
      startMinutes,
      0
    );
    const endHours = new Date(values.timeEnd).getHours();
    const endMinutes = new Date(values.timeEnd).getMinutes();
    const endDate = new Date(values.date).setHours(endHours, endMinutes, 0);
    let comments: string[] = [];
    Object.keys(values).map((el: string) => {
      if (el.includes("comment") && values[el].length > 0) {
        comments.push(values[el]);
      }
    });
    let formData = {
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      comments: comments,
      abonement: values.abonement.value,
      color:
        typeof color == "string" ? color : values.color.metaColor.originalInput,
    };
    updateEvent({ formData, id: event.id });
    dispatch(setEditMode(false));
  }

  if (initialValues && comments) {
    return (
      <ConfigProvider locale={locale}>
        <Form
          layout="vertical"
          form={form}
          name="edit-event"
          onFinish={onFinish}
          style={{ width: "100%" }}
          initialValues={{
            date: dayjs(event.startDate),
            timeStart: timeIntervals[initialValues.startTime!].value,
            timeEnd: timeIntervals[initialValues.endTime!].value,
            abonement: optionsAbonement[initialValues.abonement!],
            color: event.color,
          }}
        >
          <Form.Item
            name="date"
            rules={[{ required: true, message: "Обязательное поле" }]}
            label={<label style={{ color: "#6c7293" }}>Дата</label>}
          >
            <DatePicker format="DD.MM.YYYY" />
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
          {comments.length > 0 && (
            <Form.Item
              label={<label style={{ color: "#6c7293" }}>Комментарии</label>}
              name="comments"
            >
              <Space.Compact>
                {comments.map((comment, index) => {
                  return (
                    <Form.Item
                      initialValue={comment}
                      name={`comment-${index}`}
                      key={`comment-${index}`}
                    >
                      <Input allowClear />
                    </Form.Item>
                  );
                })}
              </Space.Compact>
            </Form.Item>
          )}
          <ColorPickerAntd color={color} setColor={setColor} />
          <ButtonSubmitAntd />
        </Form>
      </ConfigProvider>
    );
  }
};

export default FormEditEvent;
