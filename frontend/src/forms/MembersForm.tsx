import { useSearchUser } from "@/api/hooks/useSearchUser";
import { CheckIcon } from "@/assets/icons";
import { Button, Field, Modal, Option, SwitchState } from "@/components";
import { useMultiSelect } from "@/hooks/useMultiSelect";
import { useAddMember } from "@/pages/MembersPage/hooks/useAddMember";

type Props = {
  state: SwitchState;
  workspace: string;
};

export const MembersForm: React.FC<Props> = ({ state, workspace }) => {
  const { users, searchQuery, handleSearch, resetQuery } = useSearchUser();
  const { selected, handleSelect, resetSelection } = useMultiSelect<string>();
  const addMember = useAddMember();

  const handleSubmit = () => {
    addMember({ workspace, userIds: selected });
    handleClose();
  };

  const handleClose = () => {
    state.close();
    resetSelection();
    resetQuery();
  };

  return (
    <Modal state={state} onClose={handleClose} title="Пригласить пользователей">
      <Field
        placeholder="Введите логин"
        onChange={handleSearch}
        value={searchQuery}
      />

      {users && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {users.map((user, index) => (
            <Option
              key={index}
              value={user.login}
              onSelect={() => {
                handleSelect(user._id);
              }}
              indicator={selected.includes(user._id) && <CheckIcon />}
            />
          ))}
        </div>
      )}

      <Button label="Готово" onClick={handleSubmit} />
    </Modal>
  );
};
