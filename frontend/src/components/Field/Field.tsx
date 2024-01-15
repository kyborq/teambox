import { ChangeEventHandler, Ref, forwardRef } from "react";

import styles from "./Field.module.css";

type Props = {
  icon?: React.ReactNode;
  placeholder?: string;
  name?: string;
  value?: string;
  obscure?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export const Field = forwardRef(
  (
    { icon, onChange, placeholder, value, name, obscure }: Props,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <label className={styles.Field}>
        {icon}
        <input
          ref={ref}
          type={obscure ? "password" : "text"}
          name={name}
          value={value}
          onChange={onChange}
          className={styles.Input}
          placeholder={placeholder}
        />
      </label>
    );
  }
);
