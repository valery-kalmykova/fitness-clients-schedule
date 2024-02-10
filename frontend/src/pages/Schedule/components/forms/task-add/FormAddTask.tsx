import { Form, Input, DatePicker, ConfigProvider } from "antd";
import type { Color } from "antd/es/color-picker";
import { useCreateTaskMutation } from "../../../../../store/apiSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../utils/hooks/redux";
import { setModalAddEventIsOpen } from "../../../../../store/modalSlice";
import { useState } from "react";
import locale from "antd/locale/ru_RU";
import "dayjs/locale/ru";
import { EVENT_TYPE, TaskFormData } from "../../../../../utils/types";
import dayjs from "dayjs";
import ColorPickerAntd from "../../../../../components/form-fields/ColorPickerAntd";
import ButtonSubmitAntd from "../../../../../components/form-fields/ButtonSubmitAntd";
import TimeStartSelectAntd from "../../../../../components/form-fields/TimeStartSelectAntd";

type SizeType = Parameters<typeof Form>[0]["size"];

const FormAddTask = () => {
  const [form] = Form.useForm();
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const dispatch = useAppDispatch();
  const [color, setColor] = useState<Color | string>("#1677FF");
  const selectedDate = useAppSelector((state) => state.modal.selectedDate);

  const onFinish = (values: any) => {
    const hours = new Date(values.timeStart).getHours();
    const minutes = new Date(values.timeStart).getMinutes();
    const date = new Date(values.date).setHours(hours, minutes, 0);
    let formData: TaskFormData = {
      type: EVENT_TYPE.task,
      title: values.title,
      startDate: new Date(date).toISOString(),
      color:
        typeof color == "string" ? color : values.color.metaColor.originalInput,
    };
    if (values.comment) {
      formData.comments = [values.comment];
    }
    createTask(formData);
    if (isLoading == false) {
      dispatch(setModalAddEventIsOpen(false));
    }
  };

  return (
    <ConfigProvider locale={locale}>
      <Form
        layout="vertical"
        form={form}
        name="add-task"
        onFinish={onFinish}
        style={{ width: "100%" }}
        initialValues={{
          regular: "Не повторять",
          date: selectedDate && dayjs(selectedDate),
          color: "#1677FF",
        }}
        size={"large" as SizeType}
        autoComplete="off"
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
        <ColorPickerAntd color={color} setColor={setColor} />
        <ButtonSubmitAntd />
      </Form>
    </ConfigProvider>
  );
};

export default FormAddTask;
