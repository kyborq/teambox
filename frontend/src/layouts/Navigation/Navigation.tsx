import { APP_NAVIGATION } from "@/router";
import { NavButton } from "../NavButton";

import styles from "./Navigation.module.css";
import { useAppSelector } from "@/redux/hooks";
import { selectWorkspace } from "@/redux/slices/userSlice";

export const Navigation = () => {
  const routes = Object.entries(APP_NAVIGATION);
  const workspace = useAppSelector(selectWorkspace);

  if (!workspace) {
    return null;
  }

  return (
    <div className={styles.Navigation}>
      {routes.map(([route, label]) => (
        <NavButton key={route} label={label} to={route} />
      ))}
    </div>
  );
};
