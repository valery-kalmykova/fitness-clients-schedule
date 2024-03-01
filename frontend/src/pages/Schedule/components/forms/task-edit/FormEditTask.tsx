import { ConfigProvider, DatePicker, Form, Input } from "antd";
import type { Color } from "antd/es/color-picker";
import { timeIntervals } from "../../../../../utils/constants";
import { useEffect, useState } from "react";
import locale from "antd/locale/ru_RU";
import "dayjs/locale/ru";
import dayjs from "dayjs";
import { Task } from "../../../../../utils/types";
import { convertToTime } from "../../../../../utils/helpers";
import { useUpdateTaskMutation } from "../../../../../store/apiSlice";
import ColorPickerAntd from "../../../../../components/form-fields/ColorPickerAntd";
import ButtonSubmitAntd from "../../../../../components/form-fields/ButtonSubmitAntd";
import TimeStartSelectAntd from "../../../../../components/form-fields/TimeStartSelectAntd";
import { useAppDispatch } from "../../../../../utils/hooks/redux";
import { setEditMode } from "../../../../../store/modalSlice";
import CommentsEdit from "../../../../../components/form-fields/CommentsEdit";

interface Props {
  task: Task;
}

interface InitialType {
  startTime: number | undefined;
}

const FormEditTask = ({ task }: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [updateTask] = useUpdateTaskMutation();
  const [comments, setComments] = useState<string[]>([]);
  const [color, setColor] = useState<Color | string>(task.color);
  const [initialValues, setInitialValues] = useState<InitialType | null>(null);

  useEffect(() => {
    const startTime = convertToTime(task.startDate);
    let startTimeI;
    for (let i = 0; i < timeIntervals.length; i++) {
      if (timeIntervals[i].label === startTime) {
        startTimeI = i;
      }
    }
    setInitialValues({
      startTime: startTimeI,
    });
    setComments(task.comments);
  }, []);

  function onFinish(values: any) {
    const startHours = new Date(values.timeStart).getHours();
    const startMinutes = new Date(values.timeStart).getMinutes();
    const startDate = new Date(values.date).setHours(
      startHours,
      startMinutes,
      0
    );
    let comments: string[] = [];
    Object.keys(values).map((el: string) => {
      if (el.includes("comment-") && values[el]) {
        if (values[el].length > 0) {
          comments.push(values[el]);
        }
      }
    });
    let formData = {
      title: values.title,
      comments: comments,
      startDate: new Date(startDate).toISOString(),
      color:
        typeof color == "string" ? color : values.color.metaColor.originalInput,
    };
    updateTask({ formData, id: task.id });
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
            title: task.title,
            date: dayjs(task.startDate),
            timeStart: timeIntervals[initialValues.startTime!].value,
            color: task.color,
          }}
        >
          <Form.Item
            name="title"
            label={<label style={{ color: "#6c7293" }}>Название</label>}
            rules={[{ required: true, message: "Обязательное поле" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            rules={[{ required: true, message: "Обязательное поле" }]}
            label={<label style={{ color: "#6c7293" }}>Дата</label>}
          >
            <DatePicker format="DD.MM.YYYY" />
          </Form.Item>
          <TimeStartSelectAntd
            rules={{ required: true, message: "Обязательное поле" }}
            label="Время"
          />
          <CommentsEdit comments={comments} />
          <ColorPickerAntd color={color} setColor={setColor} />
          <ButtonSubmitAntd />
        </Form>
      </ConfigProvider>
    );
  }
};

export default FormEditTask;
