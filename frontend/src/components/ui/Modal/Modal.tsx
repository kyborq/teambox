import { AnimatePresence, motion } from "framer-motion";
import { ModalState } from "./hooks/useModal";
import styles from "./Modal.module.css";
import { useOnClickOutside } from "usehooks-ts";
import { useRef } from "react";

type Props = {
  state: ModalState;
  title: string;
  children?: React.ReactNode;
};

export const Modal: React.FC<Props> = ({ state, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(modalRef, state.close);

  return (
    <AnimatePresence>
      {state.visible && (
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
            <span className={styles.Title}>{title}</span>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};