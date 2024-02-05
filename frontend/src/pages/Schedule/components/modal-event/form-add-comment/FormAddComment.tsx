import { Button, Form, Input } from "antd";

interface Props {
  onFinish: (values: any) => void;
}

const FormAddComment = ({ onFinish }: Props) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  function handleOnFinish(values: any) {
    onFinish(values);
    form.resetFields();
  }

  type SizeType = Parameters<typeof Form>[0]["size"];

  return (
    <Form
      layout="vertical"
      form={form}
      name="add-comment"
      onFinish={handleOnFinish}
      style={{ width: "100%" }}
      size={"small" as SizeType}
      autoComplete="off"
    >
      <Form.Item
        name="comment"
        label={<label style={{ color: "#6c7293" }}>Добавить комментарий</label>}
        rules={[{ min: 1, required: true, message: "Не должно быть пустым" }]}
      >
        <TextArea />
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

export default FormAddComment;
