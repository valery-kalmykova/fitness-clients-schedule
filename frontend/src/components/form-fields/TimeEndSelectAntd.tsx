import { timeIntervals } from "../../utils/constants";
import { Form, Select } from "antd";

interface Props {
  startTime?: string;
  label: string;
}

const TimeEndSelectAntd = ({ startTime, label }: Props) => {

  return (
    <Form.Item
      name="timeEnd"
      dependencies={["timeStart"]}
      rules={[
        { required: true, message: "Обязательное поле" },
        ({ getFieldValue }) => ({
          validator(_, value) {
            const timeStartValue = new Date(
              getFieldValue("timeStart")
            ).toLocaleTimeString();
            if (
              !value ||
              timeStartValue < new Date(value).toLocaleTimeString()
            ) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Должно быть позже"));
          },
        }),
      ]}
      label={label && <label style={{ color: "#6c7293" }}>{label}</label>}
      style={{ width: "167px" }}
    >
      <Select options={timeIntervals} value={[startTime]} />
    </Form.Item>
  );
};

export default TimeEndSelectAntd;
