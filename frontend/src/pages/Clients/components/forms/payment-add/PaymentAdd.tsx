import { ConfigProvider, DatePicker, Form, InputNumber, Space } from "antd";
import locale from "antd/locale/ru_RU";
import "dayjs/locale/ru";
import ButtonSubmitAntd from "../../../../../components/form-fields/ButtonSubmitAntd";
import { PAYMENT_TYPE } from "../../../../../utils/types";
import { useAddClientPaymentMutation } from "../../../../../store/apiSlice";
import { useLocation } from "react-router-dom";

const PaymentAdd = () => {
  const location = useLocation();
  const [form] = Form.useForm();
  const [addPayment] = useAddClientPaymentMutation();
  function onFinish(values: any) {
    let formData = {
      amount: values.amount,
      date: values.date.toISOString(),
      type: PAYMENT_TYPE.income,
      clientId: location.pathname.split("/")[3],
    };
    addPayment(formData);
  }
  return (
    <ConfigProvider locale={locale}>
      <p style={{ marginBottom: 10 }}>Добавить платеж</p>
      <Form
        layout="vertical"
        form={form}
        name="add-payment"
        onFinish={onFinish}
        style={{ width: "100%" }}
      >
        <Space wrap>
          <Form.Item
            name="amount"
            rules={[{ required: true, message: "Обязательное поле" }]}
            style={{ marginBottom: 10 }}
          >
            <InputNumber style={{ minWidth: 150 }} suffix="руб." />
          </Form.Item>
          <Form.Item
            name="date"
            rules={[{ required: true, message: "Обязательное поле" }]}
            style={{ marginBottom: 10 }}
          >
            <DatePicker format="DD.MM.YYYY" />
          </Form.Item>
          <ButtonSubmitAntd height="32px" />
        </Space>
      </Form>
    </ConfigProvider>
  );
};

export default PaymentAdd;
