import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
const {
  Team,
  User,
} = mongoosy;


// Hämta kommande matcher, samt vilken tid och spelplan... (INGET TeamID i matches?)
// 


export default function PlayerInfo(props) {

  const [teamName, setTeamName] = useState('Team')
  const [name, setName] = useState('Player')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [matches, setMatches] = useState('matches')


  useEffect(() => {
    fetchPlayerInfo()
  }, [])


  const fetchPlayerInfo = async () => {

    console.log("Fetching Player!")
    let playerFound = await User.findOne({ _id: "5eb168864f8d2442a9e39563" })
    setName(playerFound.name)
    setEmail(playerFound.email)
    setPhone(playerFound.phoneNumber)
    console.log("Name: " + playerFound.name)

    fetchTeamInfo(playerFound.teamId)
  }

  const fetchTeamInfo = async (teamID) => {
    let foundTeam = await Team.findOne({ _id: teamID })
    setTeamName(foundTeam.name)
  }

  const fetchMatches = async (teamID) => {
    
  }

  return (
    <div class="player-info"
      // style={{
      //   display: 'inline-block',
      //   border: '1px solid gray',
      //   padding: '10px',
      //   margin: '10px'
      // }}
      //onClick={fetchPlayerInfo}
    >
      <h1 class="info-team-name">{teamName}</h1>
      <h4 class="info-player-name">{name}</h4>
      <h6 class="player-contact">{email} | tel: {phone}</h6>

      <h4 class="matches-title">Upcoming Games:</h4>
    </div>
  )
}


//     createTeamAndPlayer()
//     async function createTeamAndPlayer() {
    
//       let team = new Team({
//         club: 'Club Bravo',
//         name: "Team Let's Go",
//         gender: "Male",
//         age: 8
//       })

//       await team.save();
//       // after saving the team it has an id
//       //console.log('My saved Team', team.js);
//       //console.log(team._id);

//       let player = new User({
//         teamId: team._id,
//         name: "Lars Hankonsson",
//         role: "Participant",
//         email: "lars@hank.com",
//         phoneNumber: 2342,
//         password: "salty-babe",
//         salt: "salty"
//       })


//       await player.save();
//       console.log("Saved player: " + player._id)

//     }
     
 


    
   