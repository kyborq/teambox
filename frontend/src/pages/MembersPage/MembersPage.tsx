import { ActionButton, Loader, useSwitch } from "@/components";
import { MembersForm } from "@/forms/MembersForm";
import { Header } from "@/layouts";
import { useAppSelector } from "@/redux/hooks";
import { selectWorkspace } from "@/redux/slices/userSlice";

export const MembersPage = () => {
  const workspace = useAppSelector(selectWorkspace);
  const addMembersForm = useSwitch();

  if (!workspace) {
    return <Loader />;
  }

  return (
    <>
      <Header workspace={workspace.name} title="Участники">
        <ActionButton label="Зарегистрировать" />
        <ActionButton label="Пригласить" onClick={addMembersForm.open} />
      </Header>

      <MembersForm workspace={workspace._id} state={addMembersForm} />
    </>
  );
};
