import { createContext, useState } from "react";

export const eventSelectorsContext = createContext();

export default function EventSelectionProvider ({children}) {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <eventSelectorsContext.Provider
      value={{
        hoveredEvent, setHoveredEvent,
        selectedEvent, setSelectedEvent
        }}>
      {children}
    </eventSelectorsContext.Provider>
  )
};
