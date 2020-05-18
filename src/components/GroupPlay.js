
import React, { useState, useEffect } from 'react'
import { Table, Form, FormGroup, Input, Button } from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
import { number } from 'prop-types';
const {
  Team,
  Match,
  Cup
} = mongoosy;
// VISSA HUR MÅNGA LAG totalt
// TODO: ANGE ANTAL LAG PER GRUPP
// TODO: ANGE ANTAL GRUPPER
// Hämta alla lag med specifikt cupID:
// räkna ut hur många lag...
// låt användaren ange hur många team i varje grupp. 
// ev. kunna välja hur många matcher dem ska spela (1 - 2)...
export default function GroupPlay(props) {

  const [teams, setTeams] = useState([])
  const [cup, setCup] = useState()

  const [matches, setMatches] = useState([])
  const [teamName, setTeamName] = useState('Team')
  const [numberOfGroups, setNumberOfGroups] = useState(0)

  useEffect(() => {
    //createMatches(6)
    getGroupPlaySequence()
    fetchTeams()
  }, [])
 

  // Fetch all teams with cupID
  const fetchTeams = async () => {

    let cup = await Cup.findOne({ _id: "5ec2c5a35c58b4ee74925caa" }).populate('teams').exec() // TODO: pass in id instead?
    setCup(cup)
    console.log(cup)
    //let teams = await Team.find({ cups: cup._id })
    console.log(teams)
    setTeams(cup.teams)
    
  }

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


  const createMatches = async (amountOfTeams) => {

    let date = new Date()

    let cup = new Cup({
      name: "The Big Cup",
      organizer: "ICA",
      startDate: date,
      endDate: date,
      teams: []
      //teams: [{type: Types.ObjectId, ref: 'Team'}]
    })


    let cupTeams = []

    let i;
    for (i = 0; i < amountOfTeams; i++) {
      let team = new Team({
        club: "Club #" + i + 1,
        name: "Team #" + i + 1,
        gender: "Male",
        age: 21,
        //cups: [cup._id]
      })
      await team.save()
      console.log("team id", team[i]._id)
      cup.teams[i] = team._id
      console.log("team cup id", cup.teams[i])
    }

    await cup.save()
    //cup.teams = []

    console.log("Cup", cup.js)


    



  
  }

  const createGroups = (numberOfGroups) => {
    console.log("Creating groups: ", numberOfGroups)

    // Check if x (teams) divided with numberOfGroups == 0
    //
    
    // If more groups than teams
    if (teams.length < numberOfGroups) {
      console.log("To few teams!")
      return
    }

    // If only one team per group ???
    // if (teams.length < numberOfGroups * 2) {

    // }



    if (teams.length % numberOfGroups == 0) {
      console.log("It's even groups!")
    } else {

      console.log("Remaining;", teams.length % numberOfGroups) 
      let remainder = teams.length % numberOfGroups

    }


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
      <h1>Group Play for {}</h1>
      <h2>Total Teams {teams.length}:</h2>
      {teams.map((team, index) => (
        <h3>{team.name}</h3>
      ))}

      <Form
        //onSubmit={createGroups} return false
        >
        <FormGroup>
        <label for="number-of-groups">Number of groups</label>
        <Input
          required
          type="number"
          min="0"
          max="100"
          id="number-of-groups"
          value={numberOfGroups}
          onChange={e => setNumberOfGroups(e.target.value)} />
        
        </FormGroup>
        <Button color="info" className="m1-3 form-btn" onClick={createGroups(numberOfGroups)}>Add Referee</Button>
      </Form>
      
      
    </div>
  )
}



     