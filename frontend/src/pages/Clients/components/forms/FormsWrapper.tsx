import {
  Form,
  Button,
  Input,
  ColorPicker,
  theme,
  InputNumber,
  DatePicker,
  ConfigProvider,
} from "antd";
import type { Color } from "antd/es/color-picker";
import styles from "./FormWrapper.module.css";
import { useState } from "react";
import { presetColors } from "../../../../utils/constants";
import locale from "antd/locale/ru_RU";
import "dayjs/locale/ru";
import { useAppDispatch } from "../../../../utils/hooks/redux";
import { useAddClientMutation } from "../../../../store/apiSlice";
import { setModalAddClientIsOpen } from "../../../../store/modalSlice";
import { ClientFormData } from "../../../../utils/types";

type SizeType = Parameters<typeof Form>[0]["size"];

const FormsWrapperClients = () => {
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
    if(values.health) {
      formData.health = [values.health]
    }
    addClient(formData);
    if (isLoading == false) {
      dispatch(setModalAddClientIsOpen(false));
    }
  };

  return (
    <div className={styles.container}>
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
            label={
              <label style={{ color: "#6c7293" }}>Состояние здоровья</label>
            }
            rules={[{ required: false }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item name="color" rules={[{ required: false }]}>
            <ColorPicker
              value={color}
              onChange={setColor}
              styles={{
                popupOverlayInner: {
                  width: 224,
                },
              }}
              presets={[
                {
                  label: "Цвета",
                  colors: presetColors,
                },
              ]}
              panelRender={(_, { components: { Presets } }) => (
                <div
                  className="custom-panel"
                  style={{
                    display: "flex",
                    width: 200,
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                    }}
                  >
                    <Presets />
                  </div>
                </div>
              )}
            />
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
      </ConfigProvider>
    </div>
  );
};

export default FormsWrapperClients;
