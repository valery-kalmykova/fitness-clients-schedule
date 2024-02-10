import { Dispatch, SetStateAction } from "react";
import { timeIntervals } from "../../utils/constants";
import { Form, Select } from "antd";

interface Props {
  setTime?: Dispatch<SetStateAction<string>>;
  label: string;
  rules: any
}

const TimeStartSelectAntd = ({setTime, label, rules}: Props) => {
  return (
    <Form.Item
      name="timeStart"
      rules={[rules]}
      label={label && <label style={{ color: "#6c7293" }}>{label}</label>}
      style={{ width: "167px" }}
    >
      <Select options={timeIntervals} onChange={setTime && setTime} />
    </Form.Item>
  );
};

export default TimeStartSelectAntd;
