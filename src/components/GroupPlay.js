
import React, { useState, useEffect, useContext } from 'react'
import { Table, Form, FormGroup, Input, Button } from 'reactstrap'
import { MatchContext } from '../contexts/MatchContextProvider'
import mongoosy from 'mongoosy/frontend'
const {
  Team,
  Match,
  Cup
} = mongoosy;

// TODO: pass in date
 // Spara Cup(Id) samt group play + i som matchtype -> sedan hämta alla 
// ev. kunna välja hur många matcher dem ska spela (1 - 2)...
// Imrpove group tilldelningen? flatarray?
// skapa objekt som innehåller massa team klasser??

export default function GroupPlay(props) {

  const { appendMatch, matches, fetchMatches } = useContext(MatchContext)

  const [teamsInCup, setTeamsInCup] = useState([]) 
  const [cup, setCup] = useState()
  const [numberOfGroups, setNumberOfGroups] = useState(1)
  const [warningMessage, setWarningMessage] = useState(false)
  const [groups, setGroups] = useState([])

  const [groupMatches, setGroupMatches] = useState([[Team]])
  //const [groupMatches, setGroupMatches] = useState([])
  //const [matches, setMatches] = useState([])


  // On loading of page
  useEffect(() => {
    //Match.removeAll({ cup: "5ec2f7915c58b4ee74925cd8" })
    //deleteGroupData()
    fetchTeams("5ec2f7915c58b4ee74925cd8")
  }, [])
 



  const deleteGroupData = async () => {
        await Match.deleteMany({matchType: 'Group play'})
      matches.filter(function (match) { 
            return match.matchType.includes("Group play") && match.cup == cup._id
      }).map((match) => (
            console.log(match)
          ))
  }



  // Fetch cup and all teams with cupId
  const fetchTeams = async (cupId) => {

    let cup = await Cup.findOne({ _id: cupId}).populate('teams').exec() // TODO: pass in id instead?
    setCup(cup)
    setTeamsInCup(cup.teams)
  }








  // Returns amount of teams in each group (array) => [4, 4, 5] (two groups of 4 and one with 5 teams)
  const getGroupSequence = () => {

    let groups = [] 
    let remainder = teamsInCup.length % numberOfGroups // "unevens" removed from teams 
    let easilyDivisibleTeams = teamsInCup.length - remainder // even teams

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
    let condition = teamsInCup.length / numberOfGroups < 2 ? setWarningMessage(true) : setWarningMessage(false)
    if (condition) { return } 
    
    let groups = getGroupSequence() 
    let groupedTeams = []
    let myTeams = Array.from(teamsInCup) // Copy teams array    
    myTeams.sort(() => Math.random() - 0.5) // Shuffle array

    for (let i = 0; i < groups.length; i++) {
      
      let tempArr = []
      for (let j = 0; j < groups[i]; j++) {

        tempArr.push(myTeams.pop())
      }
      groupedTeams.push(tempArr)
    }

    setGroups(groupedTeams)
  }



  const createGroupMatches = async (teams) => {

    let date = new Date()
    
    // let match1 = new Match({
    //   result: "0-0",
    //   matchType: "Group play",
    //   date: date,
    //   startTime: date,
    //   duration: 90,
    //   activeTeamSize: 11,
    //   teams: [],
    //   cup: cup._id
    //   //teams: [Object]
    // })

    let matchesGroup = []

    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teams.length; j++) {

        if (i == j || j < i) 
          continue
        
        let match1 = new Match({
          result: "0-0",
          matchType: `Group play ${i + 1}`, // TODO: FIXA??
          date: date,
          startTime: date,
          duration: 90,
          activeTeamSize: 11,
          teams: [teams[i]._id, teams[j]._id],
          cup: cup._id

        })
        //match1.teams = [teams[i]._id, teams[j]._id];
          
        //await match1.save()
        appendMatch(match1)
        matchesGroup.push(match1)
      }
    }

    // matchesGroup.map((match) => (
    //   //console.log("match in array:", match),
    //   appendMatch(match)
    // ))
    
    // matches.map((match) => (
    //   //console.log("Saved", match)
    // ))
    //console.log("Contextength", matches.length)
    //setGroupMatches(matches)
    //setGroupMatches(...matches, matchesGroup)
  }








  
  // const fetchGroupMatches = async () => {
  //   fetchMatches(cup, "Group play")
  //   console.log("Fetched matches", matches)
  //   return matches
  // }

  
 





  return (
    <div className="player-info">
      <h1>Create Group Play</h1>
      <h4>{teamsInCup.length} Teams in Cup</h4>
      {/* {teamsInCup.map((team, index) => (
        <h3>{team.name}</h3>
      ))} */}
      <br/>
      <Form
        //onSubmit={createGroups} return false
        >
        <FormGroup>
        <label for="number-of-groups">Number of groups:</label>
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
        <Button color="info" className="m1-3 form-btn" onClick={ () => createGroups(numberOfGroups)}>Divide Teams Into Groups</Button>
      </Form>
    
  
      {
        warningMessage ?
          <h3>Needs at least two teams per group!</h3>
          :
          <div>
            {groups.map((group, i) => (
              <div>
                <h4>Group {i + 1}</h4>
                <ul>
                  {group.map((team) => (
                    <li>
                      {team.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
      }

      {groups.length > 0 ?
          <div>
            <button onClick={() => groups.map((t) => (
              createGroupMatches(t)
            ))}>Create Matches</button>
          </div>
        : null
      }

      
      <h1>
        {/* {testData().map((data, index) => ( */}
        {matches
          .filter(function (match) { 
            return match.matchType.includes("Group play") && match.cup == cup._id
          })
          // .sort((a, b) => a.matchType > b.matchType ? 1 : -1)
          .map((match, index) => (
            <div>
              <h3>{match}</h3>
              <h3>{match.teams[0].name} vs {match.teams[1].name}</h3>
            </div>

            
        ))}
      </h1>

      
      
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



     