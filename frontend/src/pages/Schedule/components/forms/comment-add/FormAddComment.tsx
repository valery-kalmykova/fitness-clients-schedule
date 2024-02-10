import { Form, Input } from "antd";
import {
  useUpdateEventMutation,
  useUpdateTaskMutation,
} from "../../../../../store/apiSlice";
import { EVENT_TYPE } from "../../../../../utils/types";
import ButtonSubmitAntd from "../../../../../components/form-fields/ButtonSubmitAntd";

interface Props {
  id: string;
  currentComments: string[];
  type: EVENT_TYPE;
}

const FormAddComment = ({ id, currentComments, type }: Props) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [updateTask] = useUpdateTaskMutation();
  const [updateEvent] = useUpdateEventMutation();

  function handleOnFinish(values: any) {
    let comments: string[] = [];
    if (currentComments.length == 0) {
      comments.push(values.comment);
    } else {
      comments.push(...currentComments);
      comments.push(values.comment);
    }
    let formData = {
      comments: comments,
    };
    if (type === EVENT_TYPE.event) {
      updateEvent({ formData, id: id });
    } else if (type === EVENT_TYPE.task) {
      updateTask({ formData, id: id });
    }
    form.resetFields();
  }

  type SizeType = Parameters<typeof Form>[0]["size"];

  return (
    <Form
      layout="vertical"
      form={form}
      name="add-comment"
      onFinish={handleOnFinish}
      style={{ width: "100%" }}
      size={"small" as SizeType}
      autoComplete="off"
    >
      <Form.Item
        name="comment"
        label={<label style={{ color: "#6c7293" }}>Добавить комментарий</label>}
        rules={[{ min: 1, required: true, message: "Не должно быть пустым" }]}
      >
        <TextArea />
      </Form.Item>
      <ButtonSubmitAntd />
    </Form>
  );
};

export default FormAddComment;
