import styles from "./Side.module.css";

type Props = {
  children?: React.ReactNode;
};

export const Side: React.FC<Props> = ({ children }) => {
  return <div className={styles.Side}>{children}</div>;
};
