export const shortName = (name: string) => {
  const [firstName, lastName] = name
    .split(" ")
    .map((part, index) => (index !== 0 ? `${part[0]}.` : part));

  return `${firstName} ${lastName}`;
};
