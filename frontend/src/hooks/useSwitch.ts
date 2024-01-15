import { useState } from "react";

export type SwitchState = {
  enabled: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
};

export const useSwitch = (initialEnabled?: boolean): SwitchState => {
  const [enabled, setEnabled] = useState(initialEnabled || false);

  const toggle = () => setEnabled((enabled) => !enabled);
  const open = () => setEnabled(true);
  const close = () => setEnabled(false);

  return {
    enabled,
    toggle,
    open,
    close,
  };
};
