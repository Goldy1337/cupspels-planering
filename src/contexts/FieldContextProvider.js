import React, { createContext, useState, useEffect } from 'react';
import mongoosy from 'mongoosy/frontend';
const {
  Field
} = mongoosy;

export const FieldContext = createContext();

export default function FieldContextProvider(props) {

  const [fields, setFields] = useState([])
  const [arenaFields, setArenaFields] = useState([])
  
  async function fetchFields() {
    let initFields = await Field.find()
    setFields(initFields)
  }
  async function fetchArenaFields(arena_id) {
    let fetchedFields = await Field.find({arenaId: arena_id})
    setArenaFields(fetchedFields)

  }
  const appendField = (field) => {
    setFields([...fields, field])
  }

  useEffect(() => {
    fetchFields()
  }, [])
  
  const values = {
    fields,
    arenaFields,
    fetchArenaFields,
    appendField,
    fetchFields
  }

  return (
    <FieldContext.Provider value={ values }>
      {props.children}
    </FieldContext.Provider>
  )
}