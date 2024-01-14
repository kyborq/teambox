import { Loader } from "../Loader";

import styles from "./Button.module.css";

type Props = {
  label: string;
  isLoading?: boolean;
  onClick?: () => void;
};

export const Button: React.FC<Props> = ({ label, isLoading, onClick }) => {
  return (
    <button className={styles.Button} onClick={onClick}>
      {isLoading ? <Loader /> : label}
    </button>
  );
};
