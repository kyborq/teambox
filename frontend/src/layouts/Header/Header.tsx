import { ArrowRightIcon } from "@/assets/icons";
import styles from "./Header.module.css";

type Props = {
  workspace: string;
  title: string;
  children?: React.ReactNode;
};

export const Header: React.FC<Props> = ({ workspace, title, children }) => {
  return (
    <div className={styles.Header}>
      <div className={styles.Path}>
        <span className={styles.Workspace}>{workspace}</span>
        <ArrowRightIcon />
        <h3 className={styles.Title}>{title}</h3>
      </div>
      <div className={styles.Actions}>{children}</div>
    </div>
  );
};
