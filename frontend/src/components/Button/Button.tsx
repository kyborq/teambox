import { Loader } from "../Loader";

import styles from "./Button.module.css";

type Props = {
  label: string;
  isLoading?: boolean;
};

export const Button: React.FC<Props> = ({ label, isLoading }) => {
  return (
    <button className={styles.Button}>{isLoading ? <Loader /> : label}</button>
  );
};
