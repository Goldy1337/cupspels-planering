import React, { createContext, useState, useEffect } from 'react';
import mongoosy from 'mongoosy/frontend';
import { stat } from 'fs';
const {
    Match
} = mongoosy;

export const MatchContext = createContext();

export default function MatchContextProvider(props) {

  const [matches, setMatches] = useState([]);

  const appendMatch = (match) => {
    setMatches([...matches, match]);
  };







  // Fetch all games being played on the specified field
  const fetchAllMatchesOnField = async (id) => {
    
    let matches = await Match.find({ fieldId: id }) 
    return matches
  }

  const fetchAvailableFields = async (id) => {

  }


  // 1. Försök skapa en match på cup.startTime på field1, sen field2, sen field3... 
  // 2. Om det inte går lägg till match duration plus 10-15 min och försök igen... 

  
  
    // Skapa match cup.startTime till 20.00

  // FÖRSÖK SKAPA första matchen när cupen startar på alla fälten, sedan starttid plus duration + 10-15min
  // matches.then()
  // TODO: pass in matchInfo
  const createMatch = (cup, currentArena, teams, avaliableFields) => {

    console.log("CUp is starting:", cup.startDate)
    console.log(teams)
    console.log(avaliableFields)

    // SKAPA EN MATCH som kollas
    let matchStart = new Date(cup.startDate)

    let newMatch = new Match({
      //fieldId: field._id,
       result: "0-0",
       matchType: "Test",
       date: matchStart,
       startTime: matchStart,
       duration: 90,
       activeTeamSize: 11,
    })

    let matchTimeIsFree = false
    do {
      let res = checkIfMatchCanBeCreated(avaliableFields, newMatch)
      if (res) {
        matchTimeIsFree = true
      } else {
        matchTimeIsFree = false
        let newStartTime = new Date(matchStart.getTime() + (duration + 10) * 60000) // Adds 10 min after each match before next
        newMatch.startTime = newStartTime
      }
    } while(!matchTimeIsFree)

    // if (checkIfMatchCanBeCreated(avaliableFields, newMatch)) {

    // } else {
    //   let newStartTime = new Date(matchStart.getTime() + (duration + 10) * 60000) // Adds 10 min after each match before next
    //   newMatch.startTime = newStartTime
    //   checkIfMatchCanBeCreated(avaliableFields, newMatch)
    // }
    // for (let field of avaliableFields) {
    //   console.log(field.name)
    //   let matches = fetchAllMatchesOnField(field._id)
    //   console.log("MATH", matches)


    //   for (let match of matches) {

    //   }
    // }

  }


  const checkIfMatchCanBeCreated = async (fields, newMatch) => {

    

    for (let field of fields) {


      newMatch.field = field._id
      let matches = await fetchAllMatchesOnField(field._id)

      let isAvailable = await checkMatchesTime(newMatch, matches)
      console.log("HOWDY")
      console.log("AVAILABLE", isAvailable)

      //matches.then(checkMatchesTime(matches))
      //matches.then(matches.forEach( e => console.log(e)))

      // for (let match of matches) {
      //   console.log("Tihs match ", match)
      // }
    }
  }

  const checkMatchesTime = async (newMatch, matches) => {
    console.log(matches)
    for (let match of matches) {
      console.log("Match to send", match)
      
      //newMatch.startTime = newMatch.startTime.getTime()
      //match.startTime = match.startTime.getTime()
      //console.log("MATCH TO ADD", newMatch.startTime)
      let available = isTimePeriodAvailable(newMatch, match)
      console.log("TIME IS AVAILABLE? ", available)
      return available
    }
  }
 

  // Check if another game is being played at the given time
  const isTimePeriodAvailable = (newMatch, matchOnField) => {

    let a = convertTimeToObject(newMatch.startTime.getTime(), newMatch.duration)
    let b = convertTimeToObject(new Date(matchOnField.startTime).getTime(), matchOnField.duration)

    return !(a.endTime >= b.startTime && a.startTime <= b.endTime ||
      a.startTime <= b.endTime && a.endTime >= b.startTime) 
  }

  
  const convertTimeToObject = (startTime, duration) => {

    let time = {
      startTime: startTime,
      endTime: startTime + (duration * 60000) 
    }

    return time
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