import React, { createContext, useState, useEffect } from 'react';
import mongoosy from 'mongoosy/frontend';
const {
    Match
} = mongoosy;

export const MatchContext = createContext();

export default function MatchContextProvider(props) {

  const [matches, setMatches] = useState([]);

  const appendMatch = (match) => {
    setMatches([...matches, match]);
  };

  // const removeMatch = (id) => {
  //   setMatches(matches.filter((match) => match.id !== id));

  //   fetch("/api/matches/" + id, {
  //     method: "DELETE",
  //   });
  // };

  const fetchMatches = async (cup, type) => {
    let initReferees = await Match.find({cup: cup._id, matchType: type})
    setMatches(initReferees);
  };



  useEffect(() => {
    //fetchMatches();
  }, []);

    const values = {
      matches,
      //setMatches,
      fetchMatches,
      appendMatch,
      //removeMatch
    };

  return (
    <MatchContext.Provider value={values}>
      {props.children}
    </MatchContext.Provider>
  );
}