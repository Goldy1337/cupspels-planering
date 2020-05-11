import React, { createContext, useState, useEffect } from "react";
import mongoosy from "mongoosy/frontend";

export const TeamContext = createContext();

export default function TeamContextProvider(props) {
  const [teams, setTeams] = useState([]);
   const { Team } = mongoosy;

  const appendTeam = (team) => {
    // three dots (...) is called a
    // spread syntax, and this will
    // copy the content of the array
    setTeams([...teams, team]);
  };

    async function clearTeams() {
      let allTeams = await Team.find();

      await Team.deleteMany({});
      console.log("clear", allTeams.js);
    }

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
      clearTeams,
     // removeTeam
    };

  return (
    <TeamContext.Provider value={values}>
      {props.children}
    </TeamContext.Provider>
  );
}
