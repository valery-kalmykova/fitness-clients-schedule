import { Button, Form } from "antd";

const ButtonSubmitAntd = () => {
  return (
    <Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        style={{ height: "42px", width: "142px" }}
      >
        Сохранить
      </Button>
    </Form.Item>
  );
};

export default ButtonSubmitAntd;
