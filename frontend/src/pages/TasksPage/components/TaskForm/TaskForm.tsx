import { CheckboxBlankIcon } from "@/assets/icons";
import styles from "./TaskForm.module.css";

export const TaskForm = () => {
  return (
    <label className={styles.TaskForm}>
      <CheckboxBlankIcon />
      <input type="text" className={styles.Input} />
    </label>
  );
};
