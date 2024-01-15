import { Side, Wrap } from "@/layouts";

type Props = {
  redirectTo: string;
};

export const ProtectedRoot: React.FC<Props> = () => {
  return (
    <Wrap>
      <Side></Side>
    </Wrap>
  );
};
