import { ColorPicker, Form } from "antd";
import { presetColors } from "../../utils/constants";
import type { Color } from "antd/es/color-picker";

interface Props {
  color: string | Color;
  setColor: any;
}

const ColorPickerAntd = ({color, setColor}: Props) => {
  return(
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
  )
};

export default ColorPickerAntd;
