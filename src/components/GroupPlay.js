
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
// När man angett hur många grupper - gör knapp synlig för att skapa matcher?

// Randomize lag
// Spara Cup(Id) samt group play + i som matchtype -> sedan hämta alla 

// ev. kunna välja hur många matcher dem ska spela (1 - 2)...
export default function GroupPlay(props) {

  const { appendMatch } = useContext(MatchContext)
  const { matches } = useContext(MatchContext)
  const { fetchMatches } = useContext(MatchContext)


  const [teams, setTeams] = useState([])
  const [cup, setCup] = useState()

  //const [matches, setMatches] = useState([])
  const [teamName, setTeamName] = useState('Team')

  const [numberOfGroups, setNumberOfGroups] = useState(1)
  const [teamsInGroup, setTeamsInGroup] = useState(2)


  const [groups, setGroups] = useState([])
  const [groupMatches, setGroupMatches] = useState([])

  //const [matches, setMatches] = useState([])

  //const [couldFormGroups, setCouldFormGroups] = useState(false)
  const [test, setTest] = useState(true)

  useEffect(() => {
    //createMatches(13)
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



  const testData = () => {
    let array = [1, 2, 3, 4, 5]
    return array
  }


  // SKicka alla teams samtidigt??
  const createGroupPlayMatches = (teams) => {

    console.log("Create Matches for group of ", teams.length)

    let date = new Date()
    
    let match1 = new Match({
      result: "0-0",
      matchType: "Group play",
      date: date,
      startTime: date,
      duration: 90,
      activeTeamSize: 11,
      teams: []
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
    console.log(matchesGroup)
    //setGroupMatches(matches)
    //setGroupMatches(...matches, matchesGroup)
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

    // Kalla på match skapandet
    for (let i = 0; i < numberOfGroups; i++) {
      createGroupPlayMatches(teamsInGroup[i])
    }
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


  const saveMatches = () => {
    console.log("Stored matchs")
    console.log("leng", groupMatches.length)
    console.log("Group mat", groupMatches)
  }


  
  const fetchGroupMatches = async () => {
    //let groupGames = await Match.findAll()
    return null
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
        <Button color="info" className="m1-3 form-btn" onClick={ () => createGroups(numberOfGroups)}>Create Groups</Button>
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
            ))}
        </tbody>
      </table> 


      // TEST
      <h1>
        {testData().map((data, index) => (
          <h3>{data}</h3>
        ))}
      </h1>



      {
        groups.length > 0 ?
          <div>
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



     