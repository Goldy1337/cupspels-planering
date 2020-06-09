import React, { createContext, useState, useEffect } from 'react';
import mongoosy from 'mongoosy/frontend';
const {
  Arena
} = mongoosy;

export const ArenaContext = createContext();

export default function ArenaContextProvider(props) {

  const [arenas, setArenas] = useState([])
  const [arena, setArena] = useState([])

  async function fetchArenas() {
    let  initArenas = await Arena.find();
    setArenas(initArenas)
  }
  async function fetchArena(id) {
    let initArena = await Arena.findOne({ _id: id });
    setArena(initArena)
  }
  
  const appendArena = (arena) => {
    setArenas([...arenas, arena])
  }

  useEffect(() => {
    fetchArenas()
  }, [])
  
  const values = {
    arenas,
    arena,
    appendArena,
    fetchArenas,
    fetchArena
  }

  return (
    <ArenaContext.Provider value={ values }>
      {props.children}
    </ArenaContext.Provider>
  )
}