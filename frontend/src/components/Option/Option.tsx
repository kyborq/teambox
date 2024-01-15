import { classNames } from "@/utils/classNames";

import styles from "./Option.module.css";

type Props = {
  value: string;
  text?: string;
  icon?: React.ReactNode;
  selected?: boolean;
  onSelect?: () => void;
};

export const Option: React.FC<Props> = ({
  value,
  text,
  icon,
  selected,
  onSelect,
}) => {
  return (
    <div
      className={classNames(styles.Value, selected && styles.Selected)}
      onClick={onSelect}
    >
      {icon}
      {value}
      {!!text && <span className={styles.Text}>{text}</span>}
    </div>
  );
};
