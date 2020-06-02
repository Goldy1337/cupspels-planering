import React, { createContext, useState, useEffect } from 'react';
import mongoosy from 'mongoosy/frontend';
const {
  Field
} = mongoosy;

export const FieldContext = createContext();

export default function FieldContextProvider(props) {

  const [fields, setFields] = useState([])
  
  async function fetchFields() {
    let initFields = await Field.find()
    setFields(initFields)
  }
  
  const appendField = (field) => {
    setFields([...fields, field])
  }

  useEffect(() => {
    fetchFields()
  }, [])
  
  const values = {
    fields,
    appendField,
    fetchFields
  }

  return (
    <FieldContext.Provider value={ values }>
      {props.children}
    </FieldContext.Provider>
  )
}