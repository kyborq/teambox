import { ActionButton, Loader, useSwitch } from "@/components";
import { MembersForm } from "@/forms/MembersForm";
import { Header } from "@/layouts";
import { useAppSelector } from "@/redux/hooks";
import { selectWorkspace } from "@/redux/slices/userSlice";
import { useMembers } from "./hooks/useMembers";

export const MembersPage = () => {
  const workspace = useAppSelector(selectWorkspace);
  const addMembersForm = useSwitch();
  const members = useMembers(workspace?._id);

  if (!workspace) {
    return <Loader />;
  }

  return (
    <>
      <Header workspace={workspace.name} title="Участники">
        <ActionButton label="Зарегистрировать" />
        <ActionButton label="Пригласить" onClick={addMembersForm.open} />
      </Header>

      {members.map((member) => {
        return <div>{member.name}</div>;
      })}

      <MembersForm workspace={workspace._id} state={addMembersForm} />
    </>
  );
};
