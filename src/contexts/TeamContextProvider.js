import React, { createContext, useState, useEffect } from "react";

export const TeamContext = createContext();

export default function TeamContextProvider(props) {
  const [teams, setTeams] = useState([]);

  const appendTeam = (team) => {
    setTeams([...teams, team]);
  };

  const removeTeam = (id) => {
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
