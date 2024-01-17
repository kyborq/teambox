import styles from "./ListElement.module.css";

type Props = {
  icon: React.ReactNode;
  text: string;
  children?: React.ReactNode;
};

export const ListElement = ({ text, icon, children }: Props) => {
  return (
    <div className={styles.ListElement}>
      {icon}
      <span className={styles.Text}>{text}</span>
      {children}
    </div>
  );
};
