import { ConfigProvider, DatePicker, Form, InputNumber, Space } from "antd";
import locale from "antd/locale/ru_RU";
import "dayjs/locale/ru";
import dayjs from "dayjs";
import ButtonSubmitAntd from "../../../../../components/form-fields/ButtonSubmitAntd";
import { useUpdateClientPaymentMutation } from "../../../../../store/apiSlice";
import { Dispatch, SetStateAction } from "react";

interface Props {
  item: any;
  setEdit: Dispatch<SetStateAction<boolean>>;
}

const PaymentEdit = ({ item, setEdit }: Props) => {
  const [form] = Form.useForm();
  const [updatePayment] = useUpdateClientPaymentMutation();
  function onFinish(values: any) {
    let formData = {
      amount: values.amount,
      date: values.date.toISOString(),
    };
    updatePayment({ formData: formData, id: item.id });
    setEdit(false);
  }

  return (
    <ConfigProvider locale={locale}>
      <Form
        layout="vertical"
        form={form}
        name="edit-payment"
        onFinish={onFinish}
        style={{ width: "100%" }}
        initialValues={{
          amount: Number(item.amount),
          date: dayjs(item.date),
        }}
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

export default PaymentEdit;
