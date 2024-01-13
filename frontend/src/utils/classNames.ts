type TClassName = string | boolean | number | null | undefined;

export const classNames = (...args: TClassName[]) => {
  return args
    .filter((a) => !!a)
    .map((a) => a)
    .join(" ");
};
