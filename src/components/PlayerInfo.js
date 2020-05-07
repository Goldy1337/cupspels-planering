import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
const {
  Team,
  User,
  Match
} = mongoosy;


// FÅ ut vilka lag som spelar...
// vilken plan?
// Dela in listan i sektioner av datum tex: fre 21/11: lista matcher.... lör 22/11: lista matcher..
// Gör tvärtom ?? populerat team istället för match?


// Hämta kommande matcher, samt vilken tid och spelplan... (INGET TeamID i matches?)
// FETCH ALL MATCHES, where teamId == nånting...


export default function PlayerInfo(props) {

  const [teamName, setTeamName] = useState('Team')
  const [name, setName] = useState('Player')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  //const [matches, setMatches] = useState('matches')
  const [matches, setMatches] = useState([{ result: '', matchType: '', date: Date, startTime: Date, duration: Number, activeTeamSize: Number}])
  //const [matches, setMatches] = useState([])

  useEffect(() => {
    fetchPlayerInfo()
    //testData()
  }, [])


  const fetchPlayerInfo = async () => {

    console.log("Fetching Player!")
    let playerFound = await User.findOne({ name: "Lasse Åhberg"})
    //let playerFound = await User.findOne({ _id: "5eb168864f8d2442a9e39563" })
    setName(playerFound.name)
    setEmail(playerFound.email)
    setPhone(playerFound.phoneNumber)
    console.log("Name: ", playerFound.name)

    fetchTeamInfo(playerFound.teamId)
  }

  const fetchTeamInfo = async (teamID) => {
    let foundTeam = await Team.findOne({ _id: teamID })
    setTeamName(foundTeam.name)


    //foundTeam.matches 
    fetchMatches(foundTeam)
  }

  const fetchMatches = async (team) => {

    // TEST DATA -----
    var d = new Date()

    let myMatch = new Match({
      result: "10-6",
      matchType: "Soccer",
      date: d,
      startTime: d,
      duration: 180,
      activeTeamSize: 11,
      teams: team._id
    })

    //myMatch.teams.push(myTeam)
        //myMatch.teams = myTeam

    //await myMatch.save()

    //console.log("Saved match: " + myMatch.js)
    // --------------------


    
    //let matches = await Match.find()
    //let playerMatches = await Match.find({ teams: team._id })

    // when we're doing more than just "find", we have to end our statement with "exec()"
    let playerMatches = await Match.find({ teams: team._id }).populate('teams').exec()


    setMatches(playerMatches)
    console.log(playerMatches)
    console.log("matches in const", matches)
    //console.log(matches)
  }



  const testData = async () => {

    // let myTeam = new Team({
    //   club: "Club Alpha",
    //   name: "The A Team",
    //   gender: "Male",
    //   age: 8,
    // })

    // //await myTeam.save()
    // //console.log(myTeam.js)

    // let myPlayer = new User({
    //   teamId: myTeam._id,
    //   name: "Lasse Åhberg",
    //   role: "Participant",
    //   email: "lasse@åh.com",
    //   phoneNumber: 23342342,
    //   password: "salty-babe",
    //   salt: "salty"
    // })

    // //await myPlayer.save()
    // //console.log(myPlayer.js)
  





    // var d = new Date()

    // let myMatch = new Match({
    //   result: "0-0",
    //   matchType: "football",
    //   date: d,
    //   startTime: d,
    //   duration: 180,
    //   activeTeamSize: 11,
    //   teams: [myTeam]
    // })

    // myMatch.teams.push(myTeam)
    //     //myMatch.teams = myTeam

    // await myTeam.save()
    // console.log(myTeam.js)

    //  await myPlayer.save()
    // console.log(myPlayer.js)

    // await myMatch.save()
    // console.log(myMatch.js)

    // let matches = await myMatch.find()
    // console.log("Found matches:" + matches.js)






    // // GET TEAM ISTÄLLET? Push 
    // console.log("IN TEST DATA")
    
    // var d = new Date();

    // let match = new Match({
    //   result: "0-0",
    //   matchType: "football",
    //   date: d,
    //   startTime: d,
    //   duration: 180,
    //   activeTeamSize: 11
    // })

    // let team1 = new Team({
    //   club: "Club Alpha",
    //   name: "The A Team",
    //   gender: "Male",
    //   age: 8,
    //   matches: [match._id]
    // })
  

    // let team2 = new Team({
    //   club: "Club Bravo",
    //   name: "The B Team",
    //   gender: "Male",
    //   age: 8,
    //   matches: [match._id]
    // })

    // match.teams.push(team1)
    // match.teams.push(team2)
    // //match.teams = [team2._id, team1._id]


    // let player1 = new User({
    //   teamId: team1._id,
    //   name: "Lasse Åhberg",
    //   role: "Participant",
    //   email: "lasse@åh.com",
    //   phoneNumber: 23342342,
    //   password: "salty-babe",
    //   salt: "salty"
    // })


    // console.log("saving stuff")

    // await team1.save();
    // await team2.save();

    // await match.save();
    // await player1.save();

    // console.log("Fetching stuff")
    // console.log(team1.js)
    // console.log(team2.js)
    // console.log(match.js)
    // console.log(player1.js)



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
      <ul>
        {matches.map((match, index) => {
          return <li key={index}>{match.result} {match.matchType}</li>
        })}
      </ul>
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
     
 


    
   