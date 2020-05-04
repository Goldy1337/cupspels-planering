import React, { createContext, useState, useEffect } from "react";
import mongoosy from "mongoosy/frontend";
const{
  User
} = mongoosy 

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [users, setUsers] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  const  appendUser = (user) => {
    setUsers([...users, user])
  }

  const appendTeamMember = (user) => {
    setTeamMembers([...teamMembers, user])
  }

  const removeUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));

    fetch("/api/users/" + id, {
      method: "DELETE",
    });
  };

  const fetchUsers = async () => {
    let allUsers = await User.find();
     setUsers(allUsers);
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  const values = {
    users,
    teamMembers,
    fetchUsers,
    setUsers,
    appendUser,
    appendTeamMember,
    removeUser
  };

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  );
}
