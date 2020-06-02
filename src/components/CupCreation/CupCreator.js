import React, { useState } from "react";
import TeamsModule from "../NewTeam";
import ArenaModule from "../NewArena";

export default function CupCreator() {
  const [cupInfo, setCupInfo] = useState({
    gname: "",
    organizer: [],
    startDate: "",
    endDate: "",
  });

  const [states, setStates] = useState({
    arenaMenu: false,
    teamsMenu: false,
    generateMatchMenu: false,
  });

  const updateStates = (updates) => {
    setStates({ ...states, ...updates });
  };

  const toggleMenu = (state) => {
    updateStates({ [state]: !states[state] });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={() => toggleMenu("arenaMenu")}>Add Arenas</button>
      <button onClick={() => toggleMenu("teamsMenu")}>Add Teams</button>
      <button onClick={() => toggleMenu("generateMatchMenu")}>
        Generate Matches
      </button>
      <div style={{}}>{states.teamsMenu ? <TeamsModule /> : <></>}</div>
      <div style={{}}>{states.arenaMenu ? <ArenaModule /> : <></>}</div>
    </div>
  );
}
