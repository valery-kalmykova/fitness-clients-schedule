import { Button, Form } from "antd";

interface Props {
  height?: string;
}

const ButtonSubmitAntd = ({ height = "42px" }: Props) => {
  return (
    <Form.Item style={{ marginBottom: 10 }}>
      <Button
        type="primary"
        htmlType="submit"
        style={{ height: height, width: "142px" }}
      >
        Сохранить
      </Button>
    </Form.Item>
  );
};

export default ButtonSubmitAntd;
