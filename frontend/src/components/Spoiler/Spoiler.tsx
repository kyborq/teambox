import { AnimatePresence, motion } from "framer-motion";

import styles from "./Spoiler.module.css";
import { SwitchState } from "../Modal";

type Props = {
  state: SwitchState;
  children?: React.ReactNode;
};

export const Spoiler: React.FC<Props> = ({ state, children }) => {
  return (
    <AnimatePresence>
      {state.enabled && (
        <motion.div
          className={styles.Spoiler}
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
