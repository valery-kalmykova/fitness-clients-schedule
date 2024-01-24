import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  ColorPicker,
  theme,
  ConfigProvider,
} from "antd";
import type { Color } from "antd/es/color-picker";
import TextArea from "antd/es/input/TextArea";
import {
  presetColors,
  optionsRegular,
  timeIntervals,
} from "../../../../../utils/constants";
import { useCreateEventMutation } from "../../../../../store/apiSlice";
import { useAppDispatch } from "../../../../../utils/hooks/redux";
import { setModalAddEventIsOpen } from "../../../../../store/modalSlice";
import { useState } from "react";
import locale from "antd/locale/ru_RU";
import "dayjs/locale/ru";
import { EVENT_TYPE } from "../../../../../utils/types";

type SizeType = Parameters<typeof Form>[0]["size"];

const FormAddEvent = () => {
  const [form] = Form.useForm();
  const [createEvent, { isLoading }] = useCreateEventMutation();
  const dispatch = useAppDispatch();
  const { token } = theme.useToken();
  const [color, setColor] = useState<Color | string>(token.colorPrimary);
  const [time, setTime] = useState();

  const onFinish = (values: any) => {
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
    const formData = {
      type: EVENT_TYPE.event,
      title: values.title,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      description: values.description,
      color:
        typeof color == "string" ? color : values.color.metaColor.originalInput,
    };
    createEvent(formData);
    if (isLoading == false) {
      dispatch(setModalAddEventIsOpen(false));
    }
  };

  return (
    <ConfigProvider locale={locale}>
      <Form
        layout="vertical"
        form={form}
        name="add-event"
        onFinish={onFinish}
        style={{ width: "100%" }}
        initialValues={{ regular: "Не повторять" }}
        size={"large" as SizeType}
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
        <Space wrap>
          <Form.Item
            name="timeStart"
            rules={[{ required: true, message: "Обязательное поле" }]}
            label={<label style={{ color: "#6c7293" }}>Начало</label>}
            style={{ width: "167px" }}
          >
            <Select options={timeIntervals} onChange={setTime} />
          </Form.Item>
          <Form.Item
            name="timeEnd"
            dependencies={['timeStart']}
            rules={[
              { required: true, message: "Обязательное поле" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("timeStart") < value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Должно быть позже")
                  );
                },
              }),
            ]}
            label={<label style={{ color: "#6c7293" }}>Окончание</label>}
            style={{ width: "167px" }}
          >
            <Select options={timeIntervals} value={[time]} />
          </Form.Item>
        </Space>
        <Form.Item
          name="description"
          label={<label style={{ color: "#6c7293" }}>Описание</label>}
          rules={[{ required: false }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          name="regular"
          rules={[{ required: false }]}
          style={{ width: "50%" }}
        >
          <Select options={optionsRegular} />
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

export default FormAddEvent;
