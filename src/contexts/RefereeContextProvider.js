import React, { createContext, useState, useEffect } from 'react';
import mongoosy from 'mongoosy/frontend';
const {
    User
} = mongoosy;

export const RefereeContext = createContext();

export default function RefereeContextProvider(props) {

  const [referees, setReferees] = useState([]) 
  

  async function fetchReferees() {
    let initReferees = await User.find({role: "Referee"})
    setReferees(initReferees)
  }
  
  const appendReferee = (referee) => {
      setReferees([...referees, referee]) // three dots (...) is called spread syntax, and this will copy the content of the array
  }

 

  useEffect(() => {
    fetchReferees()
  }, [])
  

  const values = {
    referees,
    appendReferee,
    fetchReferees
  }

  return (
    <RefereeContext.Provider value={ values }>
      {props.children}
    </RefereeContext.Provider>
  )
}
