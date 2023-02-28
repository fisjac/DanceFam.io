import { createContext, useState } from "react";

export const SelectorsContext = createContext();

export default function SelectionProvider ({children}) {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  return (
    <SelectorsContext.Provider
      value={{
        hoveredId, setHoveredId,
        selectedId, setSelectedId
        }}>
      {children}
    </SelectorsContext.Provider>
  )
};
