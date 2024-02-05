import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  ColorPicker,
  theme,
  ConfigProvider,
} from "antd";
import type { Color } from "antd/es/color-picker";
import {
  presetColors,
  optionsRegular,
  timeIntervals,
  optionsAbonement,
} from "../../../../../utils/constants";
import {
  useCreateEventMutation,
  useGetAllClientsQuery,
} from "../../../../../store/apiSlice";
import { useAppDispatch } from "../../../../../utils/hooks/redux";
import { setModalAddEventIsOpen } from "../../../../../store/modalSlice";
import { useEffect, useState } from "react";
import locale from "antd/locale/ru_RU";
import "dayjs/locale/ru";
import { Client, EVENT_TYPE, EventFormData } from "../../../../../utils/types";

type SizeType = Parameters<typeof Form>[0]["size"];

const FormAddEvent = () => {
  const [form] = Form.useForm();
  const [createEvent, { isLoading }] = useCreateEventMutation();
  const { data } = useGetAllClientsQuery(1);
  const dispatch = useAppDispatch();
  const { token } = theme.useToken();
  const [color, setColor] = useState<Color | string>(token.colorPrimary);
  const [time, setTime] = useState();
  const [regular, setRegurar] = useState("not-regular");
  const [clientsList, setClientsList] = useState<
    { label: string; value: string }[]
  >([]);
  const { TextArea } = Input;

  useEffect(() => {
    if (data) {
      let arr = data.map((el: Client) => {
        return { label: el.name, value: el.id };
      });
      setClientsList(arr);
    }
  }, [data]);

  const onFinish = (values: any) => {
    const startHours = new Date(values.timeStart).getHours();
    const startMinutes = new Date(values.timeStart).getMinutes();
    const startDate = new Date(values.date).setHours(
      startHours,
      startMinutes,
      0
    );
    const endHours = new Date(values.timeEnd).getHours();
    const endMinutes = new Date(values.timeEnd).getMinutes();
    const endDate = new Date(values.date).setHours(endHours, endMinutes, 0);
    let formData: EventFormData = {
      clientId: values.client,
      type: EVENT_TYPE.event,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      abonement: values.abonement,
      color:
        typeof color == "string" ? color : values.color.metaColor.originalInput,
    };
    if (values.comment) {
      formData.comments = [values.comment];
    }
    let repeat;
    if (values.regular === "regular") {
      repeat = "yes";
    } else {
      repeat = "no";
    }
    createEvent({ formData, repeat: repeat });
    if (isLoading == false) {
      dispatch(setModalAddEventIsOpen(false));
    }
  };

  return (
    <ConfigProvider locale={locale}>
      <Form
        layout="vertical"
        form={form}
        name="add-event"
        onFinish={onFinish}
        style={{ width: "100%" }}
        initialValues={{ regular: "Не повторять", abonement: true }}
        size={"large" as SizeType}
        autoComplete="off"
      >
        {clientsList && (
          <Form.Item
            name="client"
            label={<label style={{ color: "#6c7293" }}>Клиент</label>}
            rules={[{ required: true, message: "Обязательное поле" }]}
          >
            <Select options={clientsList} />
          </Form.Item>
        )}
        <Form.Item
          name="abonement"
          rules={[{ required: true }]}
          label={<label style={{ color: "#6c7293" }}>Абонемент</label>}
        >
          <Select options={optionsAbonement}/>
        </Form.Item>
        <Form.Item
          name="date"
          rules={[{ required: true, message: "Обязательное поле" }]}
          label={<label style={{ color: "#6c7293" }}>Дата</label>}
        >
          <DatePicker format="DD.MM.YYYY" />
        </Form.Item>
        <Space wrap>
          <Form.Item
            name="timeStart"
            rules={[{ required: true, message: "Обязательное поле" }]}
            label={<label style={{ color: "#6c7293" }}>Начало</label>}
            style={{ width: "167px" }}
          >
            <Select options={timeIntervals} onChange={setTime} />
          </Form.Item>
          <Form.Item
            name="timeEnd"
            dependencies={["timeStart"]}
            rules={[
              { required: true, message: "Обязательное поле" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("timeStart") < value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Должно быть позже"));
                },
              }),
            ]}
            label={<label style={{ color: "#6c7293" }}>Окончание</label>}
            style={{ width: "167px" }}
          >
            <Select options={timeIntervals} value={[time]} />
          </Form.Item>
        </Space>
        <Form.Item
          name="regular"
          rules={[{ required: false }]}
        >
          <Select options={optionsRegular} onChange={setRegurar} />
        </Form.Item>
        {regular === "not-regular" && (
          <Form.Item
            name="comment"
            label={<label style={{ color: "#6c7293" }}>Комментарий</label>}
            rules={[{ required: false }]}
          >
            <TextArea />
          </Form.Item>
        )}
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
  );
};

export default FormAddEvent;
