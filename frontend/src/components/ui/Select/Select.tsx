import { useRef, useState } from "react";

import styles from "./Select.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { ExpandIcon } from "../../../assets/icons";
import { useOnClickOutside } from "usehooks-ts";

type Props = {
  items: string[];
  value: string;
  onSelect?: (id: number) => void;
};

export const Select: React.FC<Props> = ({ value, items, onSelect }) => {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => items.length && setExpanded((e) => !e);
  const close = () => items.length && setExpanded(false);

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, close);

  return (
    <div className={styles.Select}>
      <AnimatePresence>
        {expanded && (
          <motion.div
            ref={ref}
            className={styles.Options}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
          >
            {items.map((option, index) => (
              <span
                className={styles.Value}
                onClick={() => {
                  onSelect && onSelect(index);
                  close();
                }}
              >
                {option}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <div className={styles.Value} onClick={toggle}>
        {expanded ? (
          <span className={styles.Placeholder}>Выберите пространство</span>
        ) : (
          value
        )}
        {!!items.length && <ExpandIcon />}
      </div>
    </div>
  );
};
