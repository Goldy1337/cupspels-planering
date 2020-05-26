
import React, { useState, useEffect, useContext } from 'react'
import { Table, Form, FormGroup, Input, Button } from 'reactstrap'
import { MatchContext } from '../contexts/MatchContextProvider'
import mongoosy from 'mongoosy/frontend'
import { number } from 'prop-types';
const {
  Team,
  Match,
  Cup
} = mongoosy;

// TODO: pass in date
// När man angett hur många grupper - gör knapp synlig för att skapa matcher?
// Randomize lag
// Spara Cup(Id) samt group play + i som matchtype -> sedan hämta alla 
// ev. kunna välja hur många matcher dem ska spela (1 - 2)...
// Imrpove group tilldelningen? flatarray?

export default function GroupPlay(props) {

  const { appendMatch } = useContext(MatchContext)
  const { matches } = useContext(MatchContext)
  const { fetchMatches } = useContext(MatchContext)


  const [teams, setTeams] = useState([]) // Behövs?
  const [cup, setCup] = useState()
  const [numberOfGroups, setNumberOfGroups] = useState(1)


  const [warningMessage, setWarningMessage] = useState(false)
  const [groups, setGroups] = useState([])
  const [groupMatches, setGroupMatches] = useState([])

  //const [matches, setMatches] = useState([])
  const [test, setTest] = useState(true)


  // On loading of page
  useEffect(() => {
    fetchTeams("5ec2f7915c58b4ee74925cd8")
  }, [])
 



  // Fetch cup and all teams with cupId
  const fetchTeams = async (cupId) => {

    let cup = await Cup.findOne({ _id: cupId}).populate('teams').exec() // TODO: pass in id instead?
    setCup(cup)
    setTeams(cup.teams)
  }









  // Returns amount of teams in each group (array)
  const getGroupSequence = () => {

    let groups = [] 
    let remainder = teams.length % numberOfGroups // "unevens" removed from teams 
    let easilyDivisibleTeams = teams.length - remainder // even teams

    for (let i = 0; i < numberOfGroups; i++) {

      if (remainder == 0) {
        groups[i] = easilyDivisibleTeams / numberOfGroups
      } else {
        groups[i] = (easilyDivisibleTeams / numberOfGroups) + 1
        remainder--
      }
    }
    return groups
  }




  // Divide Teams into groups
  const createGroups = (numberOfGroups) => {

     // If less than 2 teams per group; return and show warning message!
    let condition = teams.length / numberOfGroups < 2 ? setWarningMessage(true) : setWarningMessage(false)
    if (condition) { return } 
    
    let groups = getGroupSequence() 
    let groupedTeams = []
    let myTeams = Array.from(teams) // Copy teams array    
    myTeams.sort(() => Math.random() - 0.5) // Shuffle array


    for (let i = 0; i < groups.length; i++) {
      
      let tempArr = []
      for (let j = 0; j < groups[i]; j++) {

        tempArr.push(myTeams.pop())
      }
      groupedTeams.push(tempArr)
    }
    
    setGroups(groupedTeams)

    // // Kalla på match skapandet
    for (let i = 0; i < numberOfGroups; i++) {
      createGroupPlayMatches(groupedTeams[i])
    }
    //createGroupPlayMatches()
  }



    // SKicka alla teams samtidigt??
  const createGroupPlayMatches = (teams) => {
    //const createGroupPlayMatches = () => {
  
    console.log("Create Matches for group of ", teams.length)

    let date = new Date()
    
    let match1 = new Match({
      result: "0-0",
      matchType: "Group play",
      date: date,
      startTime: date,
      duration: 90,
      activeTeamSize: 11,
      teams: [],
      cup: cup._id
      //teams: [Object]
    })

    let matchesGroup = []

    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teams.length; j++) {

        if (i == j || j < i) 
          continue
        
            
        match1.teams = [teams[i]._id, teams[j]._id];
          
        appendMatch(match1)
        matchesGroup.push(match1)
      }
    }

    matchesGroup.map((match) => (
      appendMatch(match)
    ))
    console.log(matchesGroup)

    console.log("Contextength", matches.length)
    //setGroupMatches(matches)
    //setGroupMatches(...matches, matchesGroup)
  }








  const saveMatches = () => {
    console.log("Stored matchs")
    console.log("leng", groupMatches.length)
    console.log("Group mat", groupMatches)
  }


  
  const fetchGroupMatches = async () => {
    fetchMatches(cup, "Group play")
    console.log("Fetched matches", matches)
    return matches
  }

  
  const testData = () => {
    let array = [1, 2, 3, 4, 5]
    return array
  }





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
        <Button color="info" className="m1-3 form-btn" onClick={ () => createGroups(numberOfGroups)}>Create Groups And Matches</Button>
      </Form>
      {
        warningMessage ? 
        <h3>Needs at least two teams per group!</h3>
        :    
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
            ))}
        </tbody>
      </table> 
      }
  


      <h1>
        {/* {testData().map((data, index) => ( */}
        {matches
          .filter(function (match) { 
            return match.matchType.includes("Group play") && match.cup == cup._id
          })
          .sort((a, b) => a.matchType > b.matchType ? 1 : -1)
          .map((match, index) => (
          <h3>{match.teams[0].name} vs {match.teams[1].name}</h3>
        ))}
      </h1>



      {
        groups.length > 0 ?
          <div>
            <button onClick={() => fetchGroupMatches()}>FETCH Matches</button>
            <button onClick={() => saveMatches()}>Add Games</button>
          </div>
          :null
      }

      
{/*       
      <table>
        <tbody>
          {fetchGroupMatches().map((match, index) => (
            <div>
              <h1>{match.teams[0]} vs {match.teams[1]}</h1>
              <ul>
                {groupMatch.map((match, index) => (
                  <li>
                    {match.teams[0]._id} vs
                    {match.teams[1]._id}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </tbody>
      </table> */}


    </div>
  )
}



     