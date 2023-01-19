import React, { createContext, useState } from 'react'

export const boundsContext = createContext()

export default function BoundsProvider({children}) {
  const [bounds, setBounds] = useState();

  return (
    <boundsContext.Provider value={{bounds, setBounds}}>
      {children}
    </boundsContext.Provider>
  )
};
