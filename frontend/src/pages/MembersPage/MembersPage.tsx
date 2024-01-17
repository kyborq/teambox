import {
  ActionButton,
  List,
  ListElement,
  Loader,
  useSwitch,
} from "@/components";
import { MembersForm } from "@/forms/MembersForm";
import { Header } from "@/layouts";
import { useAppSelector } from "@/redux/hooks";
import { selectUser, selectWorkspace } from "@/redux/slices/userSlice";
import { useMembers } from "./hooks/useMembers";
import { UserIcon } from "@/assets/icons";

export const MembersPage = () => {
  const user = useAppSelector(selectUser);
  const workspace = useAppSelector(selectWorkspace);
  const addMembersForm = useSwitch();
  const members = useMembers(workspace?._id);

  if (!workspace || !user) {
    return <Loader />;
  }

  return (
    <>
      <Header workspace={workspace.name} title="Участники">
        {user.id === workspace.owner && !workspace.isPersonal && (
          <ActionButton label="Пригласить" onClick={addMembersForm.open} />
        )}
      </Header>

      <List>
        {members.map((member) => {
          return (
            <ListElement
              icon={<UserIcon />}
              text={`${member.name} ${member.id === user.id ? "(вы)" : ""}`}
            />
          );
        })}
      </List>

      <MembersForm workspace={workspace._id} state={addMembersForm} />
    </>
  );
};
