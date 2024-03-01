import { Popover } from "antd";

interface Props {
  children: React.ReactNode;
  content: () => JSX.Element;
}

const MenuItemWithPopover = ({ children, content }: Props) => {
  return (
    <Popover content={content} trigger="click">
      {children}
    </Popover>
  );
};

export default MenuItemWithPopover;
