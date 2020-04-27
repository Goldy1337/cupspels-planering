import React, { createContext, useState, useEffect } from "react";

export const TeamContext = createContext();

export default function TeamContextProvider(props) {
  const [teams, setTeams] = useState([]);

  const appendTeam = (team) => {
    // three dots (...) is called a
    // spread syntax, and this will
    // copy the content of the array
    setTeams([...teams, team]);
  };

  const removeTeam = (id) => {
    // updates the array with a filtered array
    // where we filter out our recipe
    setTeams(teams.filter((t) => t.id !== id));

    fetch("/api/teams/" + id, {
      method: "DELETE",
    });
  };

  const fetchTeams = async () => {
    let res = await fetch("/api/teams");
    res = await res.json();
    setTeams(res);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

    const values = {
      teams,
      setTeams,
      appendTeam,
      removeTeam
    };

  return (
    <TeamContext.Provider value={values}>
      {props.children}
    </TeamContext.Provider>
  );
}
