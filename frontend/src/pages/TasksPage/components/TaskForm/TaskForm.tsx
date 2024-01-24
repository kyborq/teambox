import { CheckboxBlankIcon } from "@/assets/icons";
import styles from "./TaskForm.module.css";
import { useForm } from "react-hook-form";
import { CreateTask } from "@/api/models";
import { useCreateTask } from "../../hooks/useCreateTask";

type Props = {
  workspace: string;
};

export const TaskForm = ({ workspace }: Props) => {
  const { register, handleSubmit, reset } = useForm<CreateTask>({
    values: {
      workspace,
      title: "",
    },
  });
  const { createTask } = useCreateTask();

  const onSubmit = (data: CreateTask) => {
    createTask(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.TaskForm}>
        <CheckboxBlankIcon />
        <input type="text" className={styles.Input} {...register("title")} />
      </label>
    </form>
  );
};
