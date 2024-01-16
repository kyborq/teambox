import { APP_NAVIGATION } from "@/router";
import { NavButton } from "../NavButton";

import styles from "./Navigation.module.css";

export const Navigation = () => {
  const routes = Object.entries(APP_NAVIGATION);

  return (
    <div className={styles.Navigation}>
      {routes.map(([route, label]) => (
        <NavButton key={route} label={label} to={route} />
      ))}
    </div>
  );
};
