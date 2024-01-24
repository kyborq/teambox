import { ActionButton } from "@/components";
import { Header } from "@/layouts";
import { useAppSelector } from "@/redux/hooks";
import { selectUser, selectWorkspace } from "@/redux/slices/userSlice";
import { TaskForm } from "./components";

export const TasksPage = () => {
  const user = useAppSelector(selectUser);
  const workspace = useAppSelector(selectWorkspace);

  if (!workspace || !user) {
    return null;
  }

  return (
    <>
      <Header workspace={workspace.name} title="Задачи">
        <ActionButton label="Создать задачу" />
      </Header>
      {user.id === workspace.owner && <TaskForm />}
    </>
  );
};
