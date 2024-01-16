import { useState } from "react";

export const useMultiSelect = <T>() => {
  const [selected, setSelected] = useState<T[]>([]);

  const handleSelect = (value: T) => {
    if (!selected.includes(value)) {
      setSelected((selected) => [...selected, value]);
    } else {
      setSelected((selected) => selected.filter((option) => option !== value));
    }
  };

  const resetSelection = () => {
    setSelected([]);
  };

  return { selected, handleSelect, resetSelection };
};
