import styles from "./Button.module.css";

type Props = {
  label: string;
};

export const Button: React.FC<Props> = ({ label }) => {
  return <button className={styles.Button}>{label}</button>;
};
