import { classNames } from "@/utils/classNames";

import styles from "./Option.module.css";

type Props = {
  value: string;
  text?: string;
  icon?: React.ReactNode;
  indicator?: React.ReactNode;
  selected?: boolean;
  onSelect?: () => void;
};

export const Option: React.FC<Props> = ({
  value,
  text,
  icon,
  indicator,
  selected,
  onSelect,
}) => {
  return (
    <div
      className={classNames(styles.Option, selected && styles.Selected)}
      onClick={onSelect}
    >
      {icon}
      <span className={styles.Value}>{value}</span>
      {!!text && <span className={styles.Text}>{text}</span>}
      {indicator}
    </div>
  );
};
