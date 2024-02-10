import { Form, Input, Select, DatePicker, Space, ConfigProvider } from "antd";
import type { Color } from "antd/es/color-picker";
import {
  optionsRegular,
  optionsAbonement,
} from "../../../../../utils/constants";
import {
  useCreateEventMutation,
  useGetAllClientsQuery,
} from "../../../../../store/apiSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../utils/hooks/redux";
import { setModalAddEventIsOpen } from "../../../../../store/modalSlice";
import { useEffect, useState } from "react";
import locale from "antd/locale/ru_RU";
import "dayjs/locale/ru";
import { Client, EVENT_TYPE, EventFormData } from "../../../../../utils/types";
import dayjs from "dayjs";
import ColorPickerAntd from "../../../../../components/form-fields/ColorPickerAntd";
import ButtonSubmitAntd from "../../../../../components/form-fields/ButtonSubmitAntd";
import TimeStartSelectAntd from "../../../../../components/form-fields/TimeStartSelectAntd";
import TimeEndSelectAntd from "../../../../../components/form-fields/TimeEndSelectAntd";

type SizeType = Parameters<typeof Form>[0]["size"];

const FormAddEvent = () => {
  const [form] = Form.useForm();
  const [createEvent, { isLoading }] = useCreateEventMutation();
  const { data } = useGetAllClientsQuery(1);
  const dispatch = useAppDispatch();
  const [color, setColor] = useState<Color | string>("#1677FF");
  const [time, setTime] = useState<string>("");
  const [regular, setRegurar] = useState("not-regular");
  const [clientsList, setClientsList] = useState<
    { label: string; value: string }[]
  >([]);
  const { TextArea } = Input;
  const selectedDate = useAppSelector((state) => state.modal.selectedDate);
  const [abonement, setAbonement] = useState("abonement");

  useEffect(() => {
    if (data) {
      let arr = data.map((el: Client) => {
        return { label: el.name, value: el.id };
      });
      setClientsList(arr);
    }
    form.resetFields()
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
        initialValues={{
          regular: "Не повторять",
          abonement: "abonement",
          date: selectedDate ? dayjs(selectedDate): null,
          color: "#1677FF",
        }}
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
          label={<label style={{ color: "#6c7293" }}>Оплата</label>}
        >
          <Select options={optionsAbonement} onChange={setAbonement} />
        </Form.Item>
        <Form.Item
          name="date"
          rules={[{ required: true, message: "Обязательное поле" }]}
          label={<label style={{ color: "#6c7293" }}>Дата</label>}
        >
          <DatePicker format="DD.MM.YYYY" />
        </Form.Item>
        <Space wrap>
          <TimeStartSelectAntd
            rules={{ required: true, message: "Обязательное поле" }}
            setTime={setTime}
            label="Начало"
          />
          <TimeEndSelectAntd startTime={time} label="Окончание" />
        </Space>
        {abonement === "abonement" && (
          <Form.Item name="regular" rules={[{ required: false }]}>
            <Select options={optionsRegular} onChange={setRegurar} />
          </Form.Item>
        )}
        {regular === "not-regular" && (
          <Form.Item
            name="comment"
            label={<label style={{ color: "#6c7293" }}>Комментарий</label>}
            rules={[{ required: false }]}
          >
            <TextArea />
          </Form.Item>
        )}
        <ColorPickerAntd color={color} setColor={setColor} />
        <ButtonSubmitAntd />
      </Form>
    </ConfigProvider>
  );
};

export default FormAddEvent;
