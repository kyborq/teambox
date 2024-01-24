import { Task } from "@/api/models";

import styles from "./Todo.module.css";

type Props = {
  task: Task;
};

export const Todo = ({ task }: Props) => {
  return (
    <div className={styles.Todo}>
      <span className={styles.Alias}>{task.alias}</span>
      <span className={styles.Title}>{task.title}</span>
      <span className={styles.Status}>{task.status}</span>
    </div>
  );
};
