import React, { useState, useEffect } from 'react'
import { Table } from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
const {
  Team,
  User,
  Match
} = mongoosy;


// TODO: hämta field, och gör populate?!
// TODO: sortera matcher efter tid och datum (spelade tas bort? eller läggs i en egen lista?)
// TODO: gör hämtade eller visningen av tid och datum för match på ett snyggare sätt
// Dela in listan i sektioner av datum tex: fre 21/11: lista matcher.... lör 22/11: lista matcher..
// Gör tvärtom ?? populerat team istället för match?

export default function PlayerInfo(props) {

  const [teamName, setTeamName] = useState('Team')
  const [name, setName] = useState('Player')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [matches, setMatches] = useState([])

  useEffect(() => {
    fetchPlayerInfo()
  }, [])


 
  const fetchPlayerInfo = async () => {

    console.log("Fetching Player!")
    let playerFound = await User.findOne({ name: "Lasse Åhberg"}) // TODO: FIX WITH id instead
    //let playerFound = await User.findOne({ _id: "5eb168864f8d2442a9e39563" })
    setName(playerFound.name)
    setEmail(playerFound.email)
    setPhone(playerFound.phoneNumber)

    fetchTeamInfo(playerFound.teamId)
  }

  const fetchTeamInfo = async (teamID) => {

    let foundTeam = await Team.findOne({ _id: teamID })
    setTeamName(foundTeam.name)

    fetchMatches(foundTeam)
  }

  const fetchMatches = async (team) => {
   
    // when we're doing more than just "find", we have to end our statement with "exec()"
    let playerMatches = await Match.find({ teams: team._id }).populate('teams').exec()

    setMatches(playerMatches)
  }

 







  const postDummyData = async () => {
   // TEST DATA -----
    var d = new Date()
    console.log("d is of type: ",typeof d)

    let secondTeam = new Team({
      club: "Club Bravo",
      name: "The B Team",
      gender: "Male",
      age: 8
    })
 
    await secondTeam.save()

    let newMatch = new Match({
      result: "1-1",
      matchType: "Soccer",
      date: d,
      startTime: d,
      duration: 180,
      activeTeamSize: 11,
      teams: [secondTeam._id, "5eb3cead213a696bbab5ef4d"]
    })

    let secondMatch = new Match({
      result: "100-99",
      matchType: "Quaret final",
      date: d,
      startTime: d,
      duration: 180,
      activeTeamSize: 5,
      teams: [secondTeam._id, "5eb3cead213a696bbab5ef4d"]
    })

    //newMatch.teams.push(team)
    //newMatch.teams.push(secondTeam)

    //await secondMatch.save()
    let allMatches = await Match.find()
    console.log("MATCHES: ",allMatches.js)
    //myMatch.teams.push(myTeam)
        //myMatch.teams = myTeam

    //await myMatch.save()

    //console.log("Saved match: " + myMatch.js)
    // --------------------

 }

  //  const fetchAllTeams = async () => {
  //   let allTeams = await Team.find();
  //   console.log(allTeams.js)
  // }

  const removeAllMatchs = async () => {
    let allMatches = await Match.find();

    await Match.deleteMany({});
    console.log("clear", allMatches.js);
  
  }





  return (
    <div className="player-info"
      // style={{
      //   display: 'inline-block',
      //   border: '1px solid gray',
      //   padding: '10px',
      //   margin: '10px'
      // }}
      //onClick={fetchPlayerInfo}
    >
      <h1 className="info-team-name">{teamName}</h1>
      <h4 className="info-player-name">{name}</h4>
      <h6 className="player-contact">{email} | tel: {phone}</h6>

      <h4 className="matches-title">Upcoming Games:</h4>
      <Table dark className="matches-table">
        <thead>
          <tr>
            <th>Start Time</th>
            <th>Date</th>
            <th>Round</th>
            <th>Field name</th>
            <th>Result</th>
            <th>Teams</th>
          </tr>
        </thead>
        {matches.map((match, index) => (
          <tbody key={index}>
            <tr className="matches-table">
              <td>{match.startTime.substr(11, 5)}</td>
              <td>{match.date.substr(0, 10)}</td>
              <td>{match.result}</td>
              <td>{match.matchType}</td>
              <td>{match.teams[0].name} vs {match.teams[1].name} </td>
            
                {/* <td className="teams-cell">{match.teams.map((team, index) => (
                <td className="teams-cell-specific" key={index}> 
                  <td>{team.name}</td>
                </td>
              ))}</td> */}
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  )
}



     