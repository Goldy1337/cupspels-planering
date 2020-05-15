import React, { useState, useEffect } from 'react'
import { Table } from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
const {
  Team,
  User,
  Match,
  Field
} = mongoosy;


export default function PlayerInfo(props) {

  const [clubName, setClubName] = useState('Club')
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

    // find team of player
    let foundTeam = await Team.findOne({ _id: teamID })
    setTeamName(foundTeam.name)
    setClubName(foundTeam.club)
    fetchMatches(foundTeam)
  }

  const fetchMatches = async (team) => {
   
    // Find matches with matching team._id, populate matches with teams and fields
    let playerMatches = await Match.find({ teams: team._id }).populate('teams').populate('fieldId').exec()
    setMatches(playerMatches)
  }




  return (
    <div className="player-info">
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
            let endTime = new Date(match.startTime)
            endTime.setMinutes(endTime.getMinutes() + match.duration)
            return endTime.toISOString() > new Date().toISOString() })
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
            </tr>
          </tbody>
        ))}
        <br/>      
      </Table>
    </div>
  )
}



     