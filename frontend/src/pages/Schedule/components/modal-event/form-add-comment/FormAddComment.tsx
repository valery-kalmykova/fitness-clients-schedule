import { Button, Form } from "antd";
import TextArea from "antd/es/input/TextArea";

interface Props {
  onFinish: (values: any) => void;
}

const FormAddComment = ({ onFinish }: Props) => {
  const [form] = Form.useForm();

  type SizeType = Parameters<typeof Form>[0]["size"];

  return (
    <Form
      layout="vertical"
      form={form}
      name="add-comment"
      onFinish={onFinish}
      style={{ width: "100%" }}
      size={"small" as SizeType}
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
