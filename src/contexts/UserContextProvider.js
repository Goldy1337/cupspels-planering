import React, { createContext, useState, useEffect } from "react";
import mongoosy from "mongoosy/frontend";
const{
  User
} = mongoosy 

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [users, setUsers] = useState([]);

  const  appendUser = (user) => {
    setUsers([...users, user])
  }

  const removeUser = (id) => {
    // updates the array with a filtered array
    // where we filter out our recipe
    setUsers(users.filter((u) => u.id !== id));

    fetch("/api/users/" + id, {
      method: "DELETE",
    });
  };

  const fetchUsers = async () => {
    let allUsers = await User.find();
    // let res = await fetch("/api/users");
    // res = await res.json();
     setUsers(allUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const values = {
    users,
    setUsers,
    appendUser,
    removeUser
  };

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  );
}
