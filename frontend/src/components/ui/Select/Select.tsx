import { useRef, useState } from "react";

import styles from "./Select.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { ExpandIcon } from "../../../assets/icons";
import { useOnClickOutside } from "usehooks-ts";
import { Option } from "../Option";

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
    <div className={styles.Select} ref={ref}>
      <AnimatePresence>
        {expanded && (
          <motion.div
            className={styles.Options}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
          >
            {items.map((option, index) => (
              <Option
                onSelect={() => {
                  onSelect && onSelect(index);
                  close();
                }}
                value={option}
                selected={value === option}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Option
        onSelect={toggle}
        value={value}
        icon={!!items.length && <ExpandIcon />}
      />
    </div>
  );
};
