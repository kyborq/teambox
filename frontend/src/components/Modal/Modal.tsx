import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";

import { SwitchState } from "@/hooks/useSwitch";

import styles from "./Modal.module.css";

type Props = {
  state: SwitchState;
  title: string;
  text?: string;
  children?: React.ReactNode;
};

export const Modal: React.FC<Props> = ({ state, title, text, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(modalRef, state.close);

  return (
    <AnimatePresence>
      {state.enabled && (
        <motion.div
          className={styles.Overlay}
          initial={{ background: "rgba(0, 0, 0, 0)" }}
          animate={{ background: "rgba(0, 0, 0, 0.15)" }}
          exit={{ background: "rgba(0, 0, 0, 0)" }}
        >
          <motion.div
            ref={modalRef}
            className={styles.Modal}
            initial={{ translateY: 20, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: -20, opacity: 0 }}
          >
            <div className={styles.Header}>
              <span className={styles.Title}>{title}</span>
              {!!text && <span className={styles.Text}>{text}</span>}
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
