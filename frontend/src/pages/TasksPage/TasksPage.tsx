import { ActionButton } from "@/components";
import { Header } from "@/layouts";
import { useAppSelector } from "@/redux/hooks";
import { selectUser, selectWorkspace } from "@/redux/slices/userSlice";
import { TaskForm } from "./components";
import { useTasks } from "./hooks/useTasks";

export const TasksPage = () => {
  const user = useAppSelector(selectUser);
  const workspace = useAppSelector(selectWorkspace);
  const tasks = useTasks(workspace?._id);

  if (!workspace || !user) {
    return null;
  }

  return (
    <>
      <Header workspace={workspace.name} title="Задачи">
        <ActionButton label="Создать задачу" />
      </Header>
      {tasks.map((t) => {
        return <div>{t.title}</div>;
      })}
      {user.id === workspace.owner && <TaskForm workspace={workspace._id} />}
    </>
  );
};
