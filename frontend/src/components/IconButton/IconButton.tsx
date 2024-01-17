import { MouseEventHandler } from "react";
import styles from "./IconButton.module.css";

type Props = {
  icon?: React.ReactNode;
  onClick?: () => void;
};

export const IconButton = ({ icon, onClick }: Props) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onClick && onClick();
  };

  return (
    <button onClick={handleClick} className={styles.Button}>
      {icon}
    </button>
  );
};
