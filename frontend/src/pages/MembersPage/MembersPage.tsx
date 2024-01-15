import { useState } from "react";
import { useSearchUser } from "../../api/hooks/useSearchUser";
import { UserIcon } from "../../assets/icons";
import { Button, Field, Option } from "../../components";
import { Modal, useModal } from "../../components/ui/Modal";
import { useAppSelector } from "../../redux/hooks";
import { selectWorkspace } from "../../redux/slices/userSlice";

export const MembersPage = () => {
  const [selected, setSelected] = useState("");
  const inviteModal = useModal();

  const workspace = useAppSelector(selectWorkspace);
  const { users, search, query } = useSearchUser(workspace?._id);

  if (!workspace) {
    return null;
  }

  return (
    <>
      <Button label="Пригласить" onClick={inviteModal.open} />

      <Modal
        state={inviteModal}
        title="Пригласить в пространство"
        text={workspace.name}
      >
        <Field
          placeholder="Логин пользователя"
          value={query}
          onChange={search}
        />
        {users && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {users.map((user) => (
              <Option
                icon={<UserIcon />}
                value={user.login}
                text={user.name}
                onSelect={() => setSelected(user._id)}
              />
            ))}
          </div>
        )}
        <Button label="Пригласить" />
      </Modal>
    </>
  );
};
