import styles from "./Wrap.module.css";

type Props = {
  children?: React.ReactNode;
};

export const Wrap: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.Wrap}>
      <div className={styles.Main}>{children}</div>
    </div>
  );
};
