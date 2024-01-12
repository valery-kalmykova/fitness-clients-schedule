import { Button, Form, Input, DatePicker, ColorPicker, theme } from "antd";
import type { Color } from "antd/es/color-picker";
import TextArea from "antd/es/input/TextArea";
import { useCreateEventMutation } from "../../../store/apiSlice";
import { EVENT_TYPE, presetColors } from "../../../utils/constants";
import { useAppDispatch } from "../../../utils/hooks/redux";
import { setModalAddEventIsOpen } from "../../../store/modalSlice";
import { useState } from "react";

type SizeType = Parameters<typeof Form>[0]["size"];

const FormAddTask = () => {
  const [form] = Form.useForm();
  const [createEvent, { isLoading }] = useCreateEventMutation();
  const dispatch = useAppDispatch();
  const { token } = theme.useToken();
  const [color, setColor] = useState<Color | string>(token.colorPrimary);

  const onFinish = (values: any) => {
    const formData = {
      type: EVENT_TYPE.task,
      title: values.title,
      startDate: new Date(values.date).toISOString(),
      description: values.description,
      color:
        typeof color == "string" ? color : values.color.metaColor.originalInput,
    };
    createEvent(formData);
    if(isLoading == false) {
      dispatch(setModalAddEventIsOpen(false))
    }
  };

  return (
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
        <DatePicker
          showTime={{ format: "HH:mm" }}
          format="YYYY-MM-DD HH:mm"
          minuteStep={15}
          hourStep={1}
        />
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
  );
};

export default FormAddTask;
