import { useState } from "react";

export const useModal = () => {
  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);

  const onClose = () => setOpen(false);
  return {
    isOpen,
    open,
    onClose,
  };
};