import React, { useState, useEffect } from 'react'
import { Table } from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
const {
  Team,
  User,
  Match,
  Field
} = mongoosy;


// Sortera bort redan gånga matcher, 
// TODO: hämta field, och gör populate?!
// TODO:  ta bort spelade matcher? eller läggs i en egen lista?) -- i sort(sortera matcher som är mer än date(Now) + 180. appenda i egen array.. )



  

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

    let playerMatches = await Match.find({ teams: team._id }).populate('teams').populate('fieldId').exec()

 
    setMatches(playerMatches)
    fetchAllMatches()
    //postDummyData(team)
  }

 






     // TEST DATA -----

  const postDummyData = async (team) => {

    let field = new Field({
      name: "Field A",
      size: "300X150",
      outdoors: true
    })
    await field.save()

    //var d = new Date()
    
    let dateOfGame = new Date()
    dateOfGame.setMonth(7)

    let secondTeam = new Team({
      club: "The Hurrican Hooligans",
      name: "A Team",
      gender: "Male",
      age: 8
    })
 
    await secondTeam.save()

    let newMatch = new Match({
      fieldId: field._id,
      result: "0-0",
      matchType: "Semi Final",
      date: dateOfGame,
      startTime: dateOfGame,
      duration: 90,
      activeTeamSize: 11,
      teams: [secondTeam._id, team._id]
    })

    await newMatch.save()
 }

  
  const fetchAllMatches = async () => {
    let allMatches = await Match.find()
    console.log("Matches", allMatches.js)
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
      <hr className="title-bar"></hr>
      <h4 className="info-player-name">{name}</h4>
      <h6 className="player-contact">{email} | tel: {phone}</h6>

      <h4 className="matches-title">Upcoming Games:</h4>
      <Table dark className="matches-table">
        <thead>
          <tr>
            <th>Start Time</th>
            <th>Date</th>
            <th>Fieldname</th>
            <th>Result</th>
            <th>Round</th>
            <th>Home Team</th>
            <th>Away Team</th>
          </tr>
        </thead>

        
        {matches
          .filter(function (match) {

            console.log("START TO END:")
            
            //let matchEndTime = new Date(match.startTime.getTime() + match.duration*60000)
            //console.log("END TIME: ", matchEndTime)
            
            

            //console.log(match.startTime.toDate(), " type ", typeof match.startTime)

            // console.log(currentTime, " type", typeof currentTime)
            //console.log(match.startTime, " type", typeof match.startTime )
            // console.log(match.startTime + match.duration, " time + duration")
            // console.log("comp", match.startTime < currentTime)

            let endTime = new Date(match.startTime)

            //let newEndTime = endTime.setMinutes(endTime.getTime() + match.duration * 60000)
            endTime.setMinutes( endTime.getMinutes() + match.duration )

           // let timeEnd = new Date(match.startTime)
            
            //timeEnd.setTime(timeEnd.getTime() + (match.duration * 60000))
            //timeEnd.setMinutes(match.duration)

            console.log(endTime.toISOString())
            //console.log(newEndTime.toISOString())

            //console.log("START IN SEC: ", new Date(match.startTime).toString())
            //console.log("END IN SEC: ", timeEnd.toString())
          
            //console.log("End time: ", endTime.toISOString())
            //console.log("New End time: ", newEndTime.toISOString())
        
            return endTime.toISOString() > new Date().toISOString() })
            //return match.startTime > new Date().toISOString() }) 
          .sort((a, b) => a.startTime > b.startTime ? 1 : -1)
          .map((match, index) => (
          <tbody key={index}>
            <tr className="matches-table">
              <td>{match.startTime.substr(11, 5)}</td>
                <td>{match.date.substr(0, 10)}</td>
                <td>{match.fieldId.name != null ? match.fieldId.name : "Unkown"}</td>
              <td>{match.result}</td>
              <td>{match.matchType}</td>
                <td>{match.teams[0].name}</td>
                <td>{match.teams[1].name}</td>
            
                {/* <td className="teams-cell">{match.teams.map((team, index) => (
                <td className="teams-cell-specific" key={index}> 
                  <td>{team.name}</td>
                </td>
              ))}</td> */}
            </tr>
          </tbody>
        ))}
        <br/>      
      </Table>
    </div>
  )
}



     