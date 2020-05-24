
import React, { useState, useEffect } from 'react'
import { Table, Form, FormGroup, Input, Button } from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
import { number } from 'prop-types';
const {
  Team,
  Match,
  Cup
} = mongoosy;


// TODO: ANGE ANTAL LAG PER GRUPP
// Hämta alla lag med specifikt cupID:
// räkna ut hur många lag...
// låt användaren ange hur många team i varje grupp. 
// ev. kunna välja hur många matcher dem ska spela (1 - 2)...
export default function GroupPlay(props) {

  const [teams, setTeams] = useState([])
  const [cup, setCup] = useState()

  const [matches, setMatches] = useState([])
  const [teamName, setTeamName] = useState('Team')

  const [numberOfGroups, setNumberOfGroups] = useState(1)
  const [teamsInGroup, setTeamsInGroup] = useState(2)


  const [groups, setGroups] = useState([])


  useEffect(() => {
    //createMatches(13)
    getGroupPlaySequence()
    fetchTeams()
  }, [])
 

  // Fetch all teams with cupID
  const fetchTeams = async () => {

    let cup = await Cup.findOne({ _id: "5ec2f7915c58b4ee74925cd8" }).populate('teams').exec() // TODO: pass in id instead?
    setCup(cup)
    console.log(cup)
    //let teams = await Team.find({ cups: cup._id })
    console.log(teams)

    //cup.teams.pop()

    setTeams(cup.teams)

  }


  // Alla möter alla i grupp
  const getGroupPlaySequence = () => {
    let match = {
      team1: "Team1",
      team2: "Team2"
    }

    let numberOfTeams = 3
    let matches = []

  

    for (let i = 0; i < numberOfTeams; i++) {
      for (let j = 0; j < numberOfTeams; j++) {

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


 



  const createGroups = (numberOfGroups) => {
    console.log("Creating Groups!")


    // If less than 2 teams per group
    if (teams.length / numberOfGroups < 2) {
      console.log("Needs at least two teams per group!") 
      return // TODO: RETURN A WARNING!!
    }


    let groups = [] // multidimensional array
    let teamsInGroup = []

    let remainder = teams.length % numberOfGroups
    let easilyDivisibleTeams = teams.length - remainder

    for (let i = 0; i < numberOfGroups; i++) {
      if (remainder == 0) {
        groups[i] = easilyDivisibleTeams / numberOfGroups
      } else {
        groups[i] = (easilyDivisibleTeams / numberOfGroups) + 1
        remainder--
      }
    }






    // Assigna varje team ett gruppspels nummer, samt ett lagnummer?

    // TODO: randomize array
    // TODO: Split array 

    let myTeams = [] //[[],[]]
    //Object.assign(myTeams, teams)
    //myTeams = teams.slice()
    //myTeams = [...teams]
    myTeams = Array.from(teams) // Copy teams array
    console.log("Teams", teams)
    console.log("My teams", myTeams)


    
      // Ide 2: gör groups till flat array. gå igenom både den och teams... sätt property i teams -> groupNumber: , teamNumber


    
    for (let i = 0; i < groups.length; i++) {
      console.log("Teams In Group", i + 1)
      
      let tempArr = []
      for (let j = 0; j < groups[i]; j++) {

        tempArr.push(myTeams.pop())
      }
      teamsInGroup.push(tempArr)
    }
    
    //setGroups(Array.from(teamsInGroup))
    setGroups(teamsInGroup)

    console.log("Teams in groups: ", teamsInGroup)
    console.log("groups", groups)
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

  const splitGroups = () => {

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
      <br/>
      <Form
        //onSubmit={createGroups} return false
        >
        <FormGroup>
        <label for="number-of-groups">Number of groups</label>
        <Input
          required
          type="number"
          min="1"
          max="100"
          id="number-of-groups"
          value={numberOfGroups}
          onChange={e => setNumberOfGroups(e.target.value)} />
        </FormGroup>
        {/* <FormGroup>
           <label for="teams-in-group">Number of teams per group</label>
          <Input
            required
            type="number"
            min="2"
            max="100"
            id="teams-in-group"
            value={teamsInGroup}
            onChange={e => setTeamsInGroup(e.target.value)} />
        </FormGroup> */}
        <Button color="info" className="m1-3 form-btn" onClick={ () => createGroups(numberOfGroups)}>Add Referee</Button>
      </Form>
      
      <table>
        <tbody>
          {groups.map((group, index) => (
            <div>
            <h3>Group {index + 1}</h3>
            <ul>
              {group.map((g, index) => (
                <li>
                  {g.name}
                </li>
              ))}
            </ul>
            </div>
                // <tr>
                // {group.map((g, index) => (
                //    <h5>{g.name}</h5> 
                //  ))}
                // </tr>
               
         
            ))}
        </tbody>
      </table>
      
          
     
    </div>
  )
}



     