import React, { useState, createContext } from 'react';
import mongoosy from 'mongoosy/frontend';
const {
  Login,
  User 
} = mongoosy;

export const LoginContext = createContext();

export const LoginProvider = (props) => {

  const [loginStatus, setloginStatus] = useState({ user: null });

  const updateLoginStatus = update => setloginStatus({ ...loginStatus, ...update });
    
  const [loginCheck, setLoginCheck] = useState('');

    //The functions used to handle logins
  if (loginStatus.user === null) {
    // we haven't checked if the user is logged in
    // yet so render nothing
    console.log('Starting the checkIfLoggedIn function')
    checkIfLoggedIn();
    return null;
  }

  async function checkIfLoggedIn() {
    let user = await Login.check();
    console.log('Checking if youre logged in with the checkIfLoggedInFunction')
    console.log(user)
    updateLoginStatus({ user: user.js.email ? user : false });
    console.log(loginStatus)
  }

  return (
    <LoginContext.Provider value={[loginStatus, setloginStatus, updateLoginStatus]}>
      {props.children}
    </LoginContext.Provider>
  );
}