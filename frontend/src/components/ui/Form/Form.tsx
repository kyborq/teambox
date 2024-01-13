import styles from "./Form.module.css";

type Props = {
  children?: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
};

export const Form: React.FC<Props> = ({ children, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className={styles.Form} autoComplete="off">
      {children}
    </form>
  );
};
