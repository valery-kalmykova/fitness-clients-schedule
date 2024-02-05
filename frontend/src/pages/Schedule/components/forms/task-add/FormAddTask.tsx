import {
  Button,
  Form,
  Input,
  DatePicker,
  ColorPicker,
  theme,
  ConfigProvider,
  Select,
} from "antd";
import type { Color } from "antd/es/color-picker";
import { useCreateTaskMutation } from "../../../../../store/apiSlice";
import { presetColors, timeIntervals } from "../../../../../utils/constants";
import { useAppDispatch } from "../../../../../utils/hooks/redux";
import { setModalAddEventIsOpen } from "../../../../../store/modalSlice";
import { useState } from "react";
import locale from "antd/locale/ru_RU";
import "dayjs/locale/ru";
import { EVENT_TYPE, TaskFormData } from "../../../../../utils/types";

type SizeType = Parameters<typeof Form>[0]["size"];

const FormAddTask = () => {
  const [form] = Form.useForm();
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const dispatch = useAppDispatch();
  const { token } = theme.useToken();
  const [color, setColor] = useState<Color | string>(token.colorPrimary);
  const { TextArea } = Input;

  const onFinish = (values: any) => {
    const hours = new Date(values.time).getHours();
    const minutes = new Date(values.time).getMinutes();
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
        initialValues={{ regular: "Не повторять" }}
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
        <Form.Item
          name="time"
          rules={[{ required: true, message: "Обязательное поле" }]}
          label={<label style={{ color: "#6c7293" }}>Время</label>}
          style={{ width: "167px" }}
        >
          <Select options={timeIntervals} />
        </Form.Item>
        <Form.Item
          name="description"
          label={<label style={{ color: "#6c7293" }}>Описание</label>}
          rules={[{ required: false }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item name="color" rules={[{ required: false }]}>
          <ColorPicker
            value={color}
            onChange={setColor}
            styles={{
              popupOverlayInner: {
                width: 224,
              },
            }}
            presets={[
              {
                label: "Цвета",
                colors: presetColors,
              },
            ]}
            panelRender={(_, { components: { Presets } }) => (
              <div
                className="custom-panel"
                style={{
                  display: "flex",
                  width: 200,
                }}
              >
                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <Presets />
                </div>
              </div>
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ height: "42px", width: "142px" }}
          >
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export default FormAddTask;
