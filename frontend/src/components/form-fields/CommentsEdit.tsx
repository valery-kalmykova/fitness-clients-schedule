import { Form, Input, Space } from "antd";

interface Props {
  comments: string[];
}

const CommentsEdit = ({ comments }: Props) => {
  return (
    <Form.Item
      label={<label style={{ color: "#6c7293" }}>Комментарии</label>}
      name="comments"
      style={{ width: "100%" }}
    >
      <Space.Compact
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {comments.length > 0 &&
          comments.map((comment, index) => {
            return (
              <Form.Item
                initialValue={comment}
                name={`comment-${index}`}
                key={`comment-${index}`}
              >
                <Input allowClear />
              </Form.Item>
            );
          })}
        <Form.Item
          name={`comment-new`}
          label={<label style={{ color: "#6c7293" }}>Новый комментарий</label>}
        >
          <Input.TextArea />
        </Form.Item>
      </Space.Compact>
    </Form.Item>
  );
};

export default CommentsEdit;
