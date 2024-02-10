import {
  Form,
  Input,
  theme,
  InputNumber,
  DatePicker,
  ConfigProvider,
} from "antd";
import type { Color } from "antd/es/color-picker";
import { useState } from "react";
import locale from "antd/locale/ru_RU";
import "dayjs/locale/ru";
import { useAppDispatch } from "../../../../../utils/hooks/redux";
import { useAddClientMutation } from "../../../../../store/apiSlice";
import { setModalAddClientIsOpen } from "../../../../../store/modalSlice";
import { ClientFormData } from "../../../../../utils/types";
import ColorPickerAntd from "../../../../../components/form-fields/ColorPickerAntd";
import ButtonSubmitAntd from "../../../../../components/form-fields/ButtonSubmitAntd";

type SizeType = Parameters<typeof Form>[0]["size"];

const FormAddClient = () => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const [color, setColor] = useState<Color | string>(token.colorPrimary);
  const [addClient, { isLoading }] = useAddClientMutation();
  const dispatch = useAppDispatch();
  const { TextArea } = Input;

  const onFinish = (values: any) => {
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
    addClient(formData);
    if (isLoading == false) {
      dispatch(setModalAddClientIsOpen(false));
    }
  };

  return (
    <ConfigProvider locale={locale}>
      <Form
        layout="vertical"
        form={form}
        name="add-client"
        onFinish={onFinish}
        style={{ width: "100%" }}
        size={"large" as SizeType}
        autoComplete="off"
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

export default FormAddClient;
