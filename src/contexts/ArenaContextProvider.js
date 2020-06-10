import React, { createContext, useState, useEffect } from 'react';
import mongoosy from 'mongoosy/frontend';
const {
  Arena
} = mongoosy;

export const ArenaContext = createContext();

export default function ArenaContextProvider(props) {

  const [arenas, setArenas] = useState([])
  
  async function fetchArenas() {
    let initArenas = await Arena.find()
    setArenas(initArenas)
  }
  
  const appendArena = (arena) => {
    setArenas([...arenas, arena])
  }

  useEffect(() => {
    fetchArenas()
  }, [])
  
  useEffect(() => {
    fetchArenas()
  })

  const values = {
    arenas,
    appendArena,
    fetchArenas
  }

  return (
    <ArenaContext.Provider value={ values }>
      {props.children}
    </ArenaContext.Provider>
  )
}