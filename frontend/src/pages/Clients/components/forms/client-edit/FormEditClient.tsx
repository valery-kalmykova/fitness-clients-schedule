import { ConfigProvider, DatePicker, Form, Input, InputNumber } from "antd";
import type { Color } from "antd/es/color-picker";
import locale from "antd/locale/ru_RU";
import "dayjs/locale/ru";
import dayjs from "dayjs";
import ColorPickerAntd from "../../../../../components/form-fields/ColorPickerAntd";
import ButtonSubmitAntd from "../../../../../components/form-fields/ButtonSubmitAntd";
import { useState } from "react";
import { useGetClientQuery, useUpdateClientMutation } from "../../../../../store/apiSlice";
import { useLocation } from "react-router-dom";
import { ClientFormData } from "../../../../../utils/types";
import { setModalAddClientIsOpen, setModalEditClientIsOpen } from "../../../../../store/modalSlice";
import { useAppDispatch } from "../../../../../utils/hooks/redux";

const FormEditClient = () => {
  const location = useLocation()
  const [form] = Form.useForm();
  const {TextArea} = Input;
  const dispatch = useAppDispatch()
  const { data, isLoading } = useGetClientQuery(location.pathname.split("/")[2]);
  const [updateClient] = useUpdateClientMutation();
  const [color, setColor] = useState<Color | string>(data.color);
  
  function onFinish(values: any) {
    let formData: ClientFormData = {
      name: values.name,
      phone: `+7${values.phone}`,
      color:
        typeof color == "string" ? color : values.color.metaColor.originalInput,
    };
    if (values.age) {
      formData.age = values.age.toISOString();
    }
    if (values.weight) {
      formData.weight = values.weight;
    }
    if (values.health) {
      formData.health = values.health;
    }
    updateClient({formData, id: data.id});
    if (isLoading == false) {
      dispatch(setModalEditClientIsOpen(false));
    }
  }

  return (
    <ConfigProvider locale={locale}>
      <Form
        layout="vertical"
        form={form}
        name="edit-client"
        onFinish={onFinish}
        style={{ width: "100%" }}
        initialValues={{
          name: data.name,
          age: data.age && dayjs(data.age),
          phone: data.phone.substring(2),
          weight: data.weight && data.weight,
          health: data.health && data.health,
          color: data.color,
        }}
      >
        <Form.Item
          name="name"
          label={<label style={{ color: "#6c7293" }}>Имя, Фамилия</label>}
          rules={[{ required: true, message: "Обязательное поле" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label={<label style={{ color: "#6c7293" }}>Номер телефона</label>}
          rules={[{ required: true, message: "Обязательное поле" }]}
        >
          <InputNumber
            prefix="+7"
            minLength={10}
            maxLength={10}
            style={{ width: "167px" }}
          />
        </Form.Item>
        <Form.Item
          name="age"
          label={<label style={{ color: "#6c7293" }}>День рождения</label>}
          rules={[{ required: false }]}
        >
          <DatePicker format="DD.MM.YYYY" />
        </Form.Item>
        <Form.Item
          name="weight"
          label={<label style={{ color: "#6c7293" }}>Вес</label>}
          rules={[{ required: false }]}
          style={{ width: "167px" }}
        >
          <InputNumber suffix="кг" />
        </Form.Item>
        <Form.Item
          name="health"
          label={<label style={{ color: "#6c7293" }}>Состояние здоровья</label>}
          rules={[{ required: false }]}
        >
          <TextArea />
        </Form.Item>
        <ColorPickerAntd color={color} setColor={setColor} />
        <ButtonSubmitAntd />
      </Form>
    </ConfigProvider>
  );
};

export default FormEditClient;
