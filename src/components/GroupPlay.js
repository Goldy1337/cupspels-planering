
import React, { useState, useEffect } from 'react'
import { Table } from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
const {
  Team,
  Match,
} = mongoosy;

// Hämta alla lag med specifikt cupID:
// räkna ut hur många lag...
// låt användaren ange hur många team i varje grupp. 
// ev. kunna välja hur många matcher dem ska spela (1 - 2)...
export default function GroupPlay(props) {

  const [teamName, setTeamName] = useState('Team')
 
  const [matches, setMatches] = useState([])

  useEffect(() => {
    getGroupPlaySequence()
  }, [])
 


  const getGroupPlaySequence = () => {
    let match = {
      team1: "Team1",
      team2: "Team2"
    }

    let numberOfTeams = 3
    let matches = []

    var i
    var j

    for (i = 0; i < numberOfTeams; i++) {
      for (j = 0; j < numberOfTeams; j++) {

        let skipIteration = false

        if (i == j) {
          continue
        } else {
          for (match of matches) {
            if (match.team1 == j + 1 && match.team2 == i + 1) {
              skipIteration = true
            }
          }
          if (!skipIteration) {
            let newMatch = {
              team1: i + 1,
              team2: j+ 1
            }
            matches.push(newMatch)
          }

        }
      }
    }

    console.log(matches)


  }


  const createMatches = async () => {

  }


  // const fetchPlayerInfo = async () => {

  //   console.log("Fetching Player!")
  //   let playerFound = await User.findOne({ name: "Lasse Åhberg"}) // TODO: FIX WITH id instead
  //   //let playerFound = await User.findOne({ _id: "5eb168864f8d2442a9e39563" })
  //   setName(playerFound.name)
  //   setEmail(playerFound.email)
  //   setPhone(playerFound.phoneNumber)

  //   fetchTeamInfo(playerFound.teamId)
  // }

  // const fetchTeamInfo = async (teamID) => {

  //   // find team of player
  //   let foundTeam = await Team.findOne({ _id: teamID })
  //   setTeamName(foundTeam.name)
  //   setClubName(foundTeam.club)
  //   fetchMatches(foundTeam)
  // }

  // const fetchMatches = async (team) => {
   
  //   // Find matches with matching team._id, populate matches with teams and fields
  //   let playerMatches = await Match.find({ teams: team._id }).populate('teams').populate('fieldId').exec()
  //   setMatches(playerMatches)
  // }




  return (
    <div className="player-info">
      <h1>Group Play</h1>
    </div>
  )
}



     