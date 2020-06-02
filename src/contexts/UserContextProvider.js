import React, { createContext, useState, useEffect } from "react";
import mongoosy from "mongoosy/frontend";
const { User } = mongoosy;

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [teamUsers, setTeamUsers] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  const appendUser = (user) => {
    setUsers([...users, user]);
  };

  const appendTeamMember = (user) => {
    setTeamMembers([...teamMembers, user]);
  };

  const removeUser = (id) => {
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
     setUsers(allUsers);
  };

  const saveUser = async (user) => {
    await user.save();
  };

  const fetchUser = async (email) => {
    let foundUser = await User.findOne({ email: email });
    setUser(foundUser);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const values = {
    users,
    teamMembers,
    fetchUsers,
    fetchUser,
    saveUser,
    setUsers,
    appendUser,
    appendTeamMember,
    removeUser,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
}
