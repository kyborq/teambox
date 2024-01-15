import { Side, Wrap } from "../components";

type Props = {
  redirectTo: string;
};

export const ProtectedRoot: React.FC<Props> = () => {
  return (
    <>
      <Wrap>
        <Side></Side>
      </Wrap>
    </>
  );
};
