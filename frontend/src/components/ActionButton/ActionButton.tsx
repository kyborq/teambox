import styles from "./ActionButton.module.css";

type Props = {
  label: string;
  onClick?: () => void;
};

export const ActionButton: React.FC<Props> = ({ label, onClick }) => {
  return (
    <button
      className={styles.ActionButton}
      onClick={(e) => {
        e.preventDefault();
        onClick && onClick();
      }}
    >
      {label}
    </button>
  );
};
