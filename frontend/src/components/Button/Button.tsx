import { Loader } from "@/components/Loader";

import styles from "./Button.module.css";
import { classNames } from "@/utils/classNames";

type Props = {
  label: string;
  isLoading?: boolean;
  isError?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
};

export const Button: React.FC<Props> = ({
  label,
  isLoading,
  isError,
  isDisabled,
  onClick,
}) => {
  return (
    <button
      className={classNames(
        styles.Button,
        isError && styles.Error,
        isDisabled && styles.Disabled
      )}
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLoading ? <Loader /> : label}
    </button>
  );
};
