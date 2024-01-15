import { Navigation } from "../Navigation";
import { Logo } from "../Logo";

import styles from "./Side.module.css";

type Props = {
  children?: React.ReactNode;
};

export const Side: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.Side}>
      <Logo />
      <Navigation />
      <div className={styles.Footer}>{children}</div>
    </div>
  );
};
