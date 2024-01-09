import { Button, Form, Input, Select, DatePicker, TimePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import { EVENT_TYPE } from "../../../utils/constants";
import { useCreateEventMutation } from "../../../store/apiSlice";

const options = [
  { label: "Не повторять", value: "not-regular" },
  { label: "Повторять еженедельно", value: "regular" },
];

const format = "HH:mm";

type SizeType = Parameters<typeof Form>[0]["size"];

const FormAddEvent = () => {
  const [form] = Form.useForm();
  const [createEvent, { isLoading }] = useCreateEventMutation();

  const onFinish = (values: any) => {
    const startDate = new Date(values.date);
    startDate.setHours(values.time[0].$H);
    startDate.setMinutes(values.time[0].$m);
    const endDate = new Date(values.date);
    endDate.setHours(values.time[1].$H);
    endDate.setMinutes(values.time[1].$m);
    const formData = {
      type: EVENT_TYPE.event,
      title: values.title,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      description: values.description,
    };
    createEvent(formData);
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
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="time"
        rules={[{ required: true, message: "Обязательное поле" }]}
        label={<label style={{ color: "#6c7293" }}>Время</label>}
      >
        <TimePicker.RangePicker minuteStep={15} hourStep={1} format={format} />
      </Form.Item>
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
        <Select options={options} />
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

export default FormAddEvent;
