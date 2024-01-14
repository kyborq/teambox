import { NavLink } from "react-router-dom";

import { classNames } from "../../../utils/classNames";

import styles from "./Navigation.module.css";

type Props = {
  to: string;
  label: string;
};

export const Navigation: React.FC<Props> = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(styles.Navigation, isActive && styles.Current)
      }
    >
      {label}
    </NavLink>
  );
};
