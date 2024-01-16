import { ActionButton } from "@/components";
import { Header } from "@/layouts";
import { useAppSelector } from "@/redux/hooks";
import { selectWorkspace } from "@/redux/slices/userSlice";

export const RolesPage = () => {
  const workspace = useAppSelector(selectWorkspace);

  if (!workspace) {
    return null;
  }

  return (
    <>
      <Header workspace={workspace.name} title="Роли">
        <ActionButton label="Новая роль" />
      </Header>
    </>
  );
};
