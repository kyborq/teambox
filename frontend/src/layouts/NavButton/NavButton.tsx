import { NavLink } from "react-router-dom";

import { classNames } from "@/utils/classNames";

import styles from "./NavButton.module.css";

type Props = {
  to: string;
  label: string;
};

export const NavButton: React.FC<Props> = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(styles.NavButton, isActive && styles.Current)
      }
    >
      {label}
    </NavLink>
  );
};
