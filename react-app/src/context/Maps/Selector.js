import { createContext, useState } from "react";

export const SelectorsContext = createContext();

export default function SelectionProvider ({children, persistSelections=false, initialValue=null}) {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(initialValue);


  return (
    <SelectorsContext.Provider
      value={{
        hoveredId, setHoveredId,
        selectedId, setSelectedId, persistSelections
        }}>
      {children}
    </SelectorsContext.Provider>
  )
};
