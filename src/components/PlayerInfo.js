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


// class PlayerInfo extends React.Component {
//   constructor(props) {
//     super(props);
    
//     this.state = {
//       name: '',
//       email: '',
//       phoneNumber: '',
//       teamId: ''
//     }

//     this.handleClick = this.handleClick.bind(this)

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
     
//     getPlayerInfo()



    
  


//     async function getPlayerInfo() {
//       console.log("HELlo")
//       let foundPlayer = await User.findOne({ _id: "5eb168864f8d2442a9e39563" })
//       this.setState({name: foundPlayer.name })
//       console.log("Name: " + foundPlayer.name)
//     }
    
//     async function getTeamInfo() {

//       let team = await Team.findOne({ _id: state.teamId })

//     }

//     handleClick() {
//       this.setState(state => ({
//         name: "Kalle Sprong"
//       }))
//     }
//     function getInfo() {
//       console.log("Who")
//     } 
    
//     //async function getPlayerInfo(player) {

// //       let foundPlayer = await User.findOne({ _id: "5eb0194c42abd92ddc8faae7" })
// //       console.log(foundPlayer)
// //       console.log("PlayerFound " + foundPlayer.name)

// //       this.setState({ name: "Monkey" })
// //       //this.state.name = "Monkey"//foundPlayer.name

// //       console.log("INF=P" + this.state.name)
// //       // let allTeams = await User.findOne({role: "Player"});
// //       // console.log("Teams: " + allTeams)


// //       // let foundPlayer = await User.findOne({ _id: currentPlayer._id })
    
// //       // console.log('foundPlayer', foundPlayer.js);
// //     }
//   }
  

//   render() {
//     return (
//       <div>
//         <button onClick={ this.getInfo }>Click Me</button>
//         <h1>Player info</h1>
//         <h3>Player name: {this.state.name}</h3>
//       </div>
//     )
//   }
// }











// const PlayerInfo = () => {

//     this.state = {
//       name: '',
//       email: '',
//       phoneNumber: ''
//     }
  
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
 

//     //   // Create a new referee and save to db
//     // let newReferee = new User({
//     //   name: referee.lastName + ' ' + referee.firstName,
//     //   role: "Referee",
//     //   email: referee.email,
//     //   phoneNumber: referee.phoneNumber,
//     //   password: referee.password,
//     //   salt: "salty-b"
//     // });
  
//     getPlayerInfo()

//     async function getPlayerInfo(player) {

//       let foundPlayer = await User.findOne({ _id: "5eb0194c42abd92ddc8faae7" })
//       console.log(foundPlayer)
//       console.log("PlayerFound " + foundPlayer.name)

//       this.setState({ name: "Monkey" })
//       //this.state.name = "Monkey"//foundPlayer.name

//       console.log("INF=P" + this.state.name)
//       // let allTeams = await User.findOne({role: "Player"});
//       // console.log("Teams: " + allTeams)


//       // let foundPlayer = await User.findOne({ _id: currentPlayer._id })
    
//       // console.log('foundPlayer', foundPlayer.js);
//     }
  

//   return (
//     <div>
//       <h1>Player information</h1>
//       <h3>{this.state.name}</h3>
//       <h3>Upcoming games:</h3>
//     </div>
//   )
  
// }

//export default PlayerInfo