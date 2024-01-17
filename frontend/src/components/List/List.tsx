import styles from "./List.module.css";

type Props = {
  children?: React.ReactNode;
};

export const List = ({ children }: Props) => {
  return <div className={styles.List}>{children}</div>;
};
