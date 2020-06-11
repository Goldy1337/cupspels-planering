import React, { createContext, useState, useEffect } from "react";
import mongoosy from "mongoosy/frontend";

const { Arena, Field, Login, Match, User, Team, Address } = mongoosy;

export const GlobalContext = createContext();

export default function GlobalContextProvider(props) {
  useEffect(() => {
    fetchArenas();
    fetchFields();
    fetchMatches();
    fetchReferees();
    fetchTeams();
  }, []);

  //#region STATES

  const [arenas, setArenas] = useState([]);
  const [arena, setArena] = useState([]);
  const [fields, setFields] = useState([]);
  const [matches, setMatches] = useState([]);
  const [referees, setReferees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [colorTheme, setColorTheme] = useState(getStoredColorTheme);

  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState();
  const [unformattedAddress, setUnformattedAddress] = useState();
  const [arenaAddress, setArenaAddress] = useState();
  const [arenaFields, setArenaFields] = useState();

  const [loginStatus, setloginStatus] = useState({ user: null });

  //#endregion

  useEffect(() => {
    localStorage.setItem("colorTheme", JSON.stringify(colorTheme));
  }, [colorTheme]);

  // useEffect(() => {
  //   fetchArenas()
  // })

  //#region UPDATE METHODS

  const updateLoginStatus = (update) =>
    setloginStatus({ ...loginStatus, ...update });

  //#endregion

  //#region FETCH REQUESTS

  async function fetchAddresses() {
    let initAddresses = await Address.find();
    setAddresses(initAddresses);
  }
  async function fetchAddress(id) {
    let anAddress = await Address.findOne({ _id: id });
    setAddress(anAddress);
  }

  async function fetchArenaAddress(coords) {
    let anAddress = await Address.findOne({ coordinates: coords });
    setArenaAddress(anAddress);
  }

  async function fetchArenas() {
    let initArenas = await Arena.find({});
    setArenas(initArenas);
  }
  async function fetchArena(id) {
    let initArena = await Arena.findOne({ _id: id });
    setArena(initArena);
  }

  async function fetchFields() {
    let initFields = await Field.find({});
    setFields(initFields);
  }
  const fetchMatches = async () => {
    let initMatches = await Match.find({}).populate("teams").exec();
    setMatches(initMatches);
  };
  async function fetchReferees() {
    let initReferees = await User.find({ role: "Referee" });
    setReferees(initReferees);
  }
  const fetchTeams = async () => {
    let res = await Team.find({}); // fetch("/api/teams");
    //res = await res.json();
    setTeams(res);
  };
    async function fetchArenaFields(arena_id) {
      let fetchedFields = await Field.find({ arenaId: arena_id });
      setArenaFields(fetchedFields);
    }

  //#endregion

  //#region APPENDS
  const appendAddress = (address) => {
    setAddresses([...addresses, address]);
  };

  const appendField = (field) => {
    setFields([...fields, field]);
  };
  const appendArena = (arena) => {
    setArenas([...arenas, arena]);
  };
  const appendMatch = (match) => {
    setMatches([...matches, match]);
  };
  const appendReferee = (referee) => {
    setReferees([...referees, referee]);
  };
  const appendTeam = (team) => {
    setTeams([...teams, team]);
  };
  const appendUser = (user) => {
    setUsers([...users, user]);
  };

  //#endregion

  //#region GENERAL FUNCTIONS

  if (loginStatus.user === null) {
    // we haven't checked if the user is logged in
    // yet so render nothing
    console.log("Starting the checkIfLoggedIn function");
    checkIfLoggedIn();
    return null;
  }

  async function addUnformattedAddress(anAddress) {
    //let anAddress = await Address.find({_id: id})
    setUnformattedAddress(anAddress);
  }

  async function checkIfLoggedIn() {
    let user = await Login.check();
    console.log("Checking if youre logged in with the checkIfLoggedInFunction");
    console.log(user);
    updateLoginStatus({ user: user.js.email ? user : false });
    console.log(loginStatus);
  }

  async function clearTeams() {
    let allTeams = await Team.find();

    await Team.deleteMany({});
    console.log("clear", allTeams.js);
  }

  function getStoredColorTheme() {
    const storedColorTheme = JSON.parse(localStorage.getItem("colorTheme"));
    if (storedColorTheme === "dark") {
      document.querySelector("body").classList.toggle("darkMode", true);
    }
    if (storedColorTheme === "info") {
      document.querySelector("body").classList.toggle("darkMode", false);
    }
    return storedColorTheme || "info";
  }

  //#endregion

  const values = {
    fields,
    arenas,
    arenaFields,
    fetchArenas,
    fetchArena,
    fetchAddress,
    fetchAddresses,
    fetchArenaAddress,
    fetchFields,
    appendArena,
    appendField,
    appendUser,
    fetchArenaFields,
    

    address,
    addresses,
    unformattedAddress,
    arenaAddress,
    appendAddress,
    addUnformattedAddress,

    matches,
    fetchMatches,
    appendMatch,

    referees,
    appendReferee,
    fetchReferees,

    teams,
    setTeams,
    appendTeam,
    clearTeams,

    colorTheme,
    setColorTheme,

    loginStatus,
    updateLoginStatus,
  };

  return (
    <GlobalContext.Provider value={values}>
      {props.children}
    </GlobalContext.Provider>
  );
}
