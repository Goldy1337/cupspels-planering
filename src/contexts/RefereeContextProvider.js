import React, { createContext, useState } from 'react';
// import mongoosy from 'mongoosy/frontend';
// const {
//     User
// } = mongoosy;

export const RefereeContext = createContext();

export default function RefereeContextProvider(props) {
    const [referees, setReferees] = useState([
        {
            firstName: 'Hank',
            lastName: 'Ky',
            email: 'asd@asd.com',
            phoneNumber: '231312',
        },
        {
            firstName: 'Henk',
            lastName: 'He',
            email: '',
            phoneNumber: '',
        }
    ])
  
  const appendReferee = (referee) => {
      setReferees([...referees, referee]) // three dots (...) is called spread syntax, and this will copy the content of the array
  }
  
  const values = {
    referees,
    appendReferee
  }

  return (
    <RefereeContext.Provider value={{ values }}>
      {props.children}
    </RefereeContext.Provider>
  )


}
