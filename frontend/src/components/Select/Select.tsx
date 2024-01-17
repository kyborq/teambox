import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { Option } from "@/components/Option";
import { Spoiler } from "@/components/Spoiler";
import { useSwitch } from "@/hooks/useSwitch";
import { CheckIcon, ExpandIcon } from "@/assets/icons";

import styles from "./Select.module.css";

type Props = {
  value: string;
  items?: string[];
  children?: React.ReactNode;
  onSelect?: (id: number) => void;
};

export const Select: React.FC<Props> = ({
  value,
  items,
  children,
  onSelect,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const state = useSwitch();

  useOnClickOutside(ref, state.close);

  return (
    <div className={styles.Select} ref={ref}>
      <Spoiler state={state}>
        {items && items.length
          ? items.map((option, index) => (
              <Option
                key={index}
                onSelect={() => {
                  onSelect && onSelect(index);
                  state.close();
                }}
                value={option}
                selected={value === option}
                indicator={value === option && <CheckIcon />}
              />
            ))
          : children}
      </Spoiler>

      <Option onSelect={state.toggle} value={value} icon={<ExpandIcon />} />
    </div>
  );
};
