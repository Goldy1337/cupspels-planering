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

  // FÖRSÖK SKAPA första matchen när cupen startar på alla fälten, sedan starttid plus duration + 10-15min
  // matches.then()
  const createMatch = (teams, avaliableFields) => {
    console.log("MATCH CONTEXT:")
    console.log(teams)
    console.log(avaliableFields)

    // SKAPA EN MATCH som kollas
    let date = new Date()

    let match = new Match({
      //fieldId: field._id,
       result: "0-0",
       matchType: "Test",
       date: date,
       startTime: date,
       duration: 90,
       activeTeamSize: 11,
    })

    checkIfMatchCanBeCreated(avaliableFields)
    // for (let field of avaliableFields) {
    //   console.log(field.name)
    //   let matches = fetchAllMatchesOnField(field._id)
    //   console.log("MATH", matches)


    //   for (let match of matches) {

    //   }
    // }

  }


  const checkIfMatchCanBeCreated = async (fields) => {
    for (let field of fields) {


      let matches = await fetchAllMatchesOnField(field._id)

      checkMatchesTime(matches)
      //matches.then(checkMatchesTime(matches))
      //matches.then(matches.forEach( e => console.log(e)))

      // for (let match of matches) {
      //   console.log("Tihs match ", match)
      // }
    }
  }

  const checkMatchesTime = (matches) => {
    console.log(matches)
    for (let match of matches) {
      console.log(match)
    }
  }
 
  // Fetch all games being played on the specified field
  const fetchAllMatchesOnField = async (id) => {
    
    let matches = await Match.find({ fieldId: id }) 
    return matches
  }


  // Check if another game is being played at the given time
  const isTimePeriodAvailable = (newMatch, matchOnField) => {
    if (newMatch.endTime >= matchOnField.startTime && newMatch.startTime <= matchOnField.endTime ||
      newMatch.startTime <= matchOnField.endTime && newMatch.endTime >= matchOnField.startTime) { return true }

    return false 
  }




  // const removeMatch = (id) => {
  //   setMatches(matches.filter((match) => match.id !== id));

  //   fetch("/api/matches/" + id, {
  //     method: "DELETE",
  //   });
  // };

  // const fetchMatches = async (cup, type) => {
  //   let initMatches = await Match.find({cup: cup._id, matchType: type})
  //   setMatches(initMatches);
  // };

  const fetchMatches = async () => {
    let initMatches = await Match.find().populate('teams').exec()
    setMatches(initMatches)
  }



  useEffect(() => {
    fetchMatches();
  }, []);

    const values = {
      matches,
      //setMatches,
      fetchMatches,
      appendMatch,
      createMatch
      //removeMatch
    };

  return (
    <MatchContext.Provider value={values}>
      {props.children}
    </MatchContext.Provider>
  );
}