import styles from "./Content.module.css";

type Props = {
  children?: React.ReactNode;
};

export const Content: React.FC<Props> = ({ children }) => {
  return <div className={styles.Content}>{children}</div>;
};
