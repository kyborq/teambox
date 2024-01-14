import { useState } from "react";

export type ModalState = {
  visible: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
};

export const useModal = (initialVisible?: boolean): ModalState => {
  const [visible, setVisible] = useState(initialVisible || false);

  const toggle = () => setVisible((visible) => !visible);
  const open = () => setVisible(true);
  const close = () => setVisible(false);

  return {
    visible,
    toggle,
    open,
    close,
  };
};
