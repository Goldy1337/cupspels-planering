import React, { useState, useEffect } from 'react'
import { Table } from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
const {
  Team,
  User,
  Match
} = mongoosy;




// Fetcha lagen från match, kolla att laget inte är egna, spara som motståndar laget


// Hämta field id och gör populate?!


// Fixa tiden, date bara vissa dautm, startTIme bara vissa timmar och minuter etc...
  // _ fixa så den hämta från T och framåt eller HH::mm

// FÅ ut vilka lag som spelar...
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
  //const [matches, setMatches] = useState([{ result: '', matchType: '', date: Date, startTime: Date, duration: Number, activeTeamSize: Number}])
  const [matches, setMatches] = useState([])
  const [oppositeTeam, setOppositeTeam] = useState('')

  useEffect(() => {

    //removeAllMatchs()
    //fetchAllTeams()
    fetchPlayerInfo()
    //testData()
  }, [])

  const fetchAllTeams = async () => {
    let allTeams = await Team.find();
    console.log(allTeams.js)
  }

  const removeAllMatchs = async () => {
    let allMatches = await Match.find();

    await Match.deleteMany({});
    console.log("clear", allMatches.js);
  
  }

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
    console.log("d is of type: ",typeof d)

    let secondTeam = new Team({
      club: "Club Bravo",
      name: "The B Team",
      gender: "Male",
      age: 8
    })
 
    //await secondTeam.save()

    let newMatch = new Match({
      result: "1-1",
      matchType: "Soccer",
      date: d,
      startTime: d,
      duration: 180,
      activeTeamSize: 11,
      teams: [team._id, "5eb3cead213a696bbab5ef4d"]
    })

    //newMatch.teams.push(team)
    //newMatch.teams.push(secondTeam)

    //await newMatch.save()

    //myMatch.teams.push(myTeam)
        //myMatch.teams = myTeam

    //await myMatch.save()

    //console.log("Saved match: " + myMatch.js)
    // --------------------


    
    //let matches = await Match.find()
    //let playerMatches = await Match.find({ teams: team._id })

    // when we're doing more than just "find", we have to end our statement with "exec()"
    let playerMatches = await Match.find({ teams: team._id }).populate('teams').exec()

    //let oppositeTeam = playerMatches.teams.forEach(getOpposingTeam)
    
    //setOppositeTeam(playerMatches.teams.filter(getOpposingTeam))

    setMatches(playerMatches)

    
    let time = playerMatches[0].startTime
    console.log("START TIME: ", time)
    console.log("Type of time", typeof time)
    console.log("TIme", time.fo)
    console.log("Part of string", time.substr(11, 5))
   // console.log("Part of string", time.substr(T, 2))

    console.log("AMount", playerMatches.length)
    //console.log('OWN TEAM', playerMatches[25].teams[0])
    //console.log('Opposite Team', playerMatches[25].teams[1])
  }

  const getOpposingTeam = (value) => {
    console.log("Team NAMES??", matches.teams[0])
    if (value.name != teamName) {
      return value.name
    }
  }


  const fetchOpposingTeam = (match) => {

    //for (teams )
    

    //let oppositeTeam = playerMatches.teams
    
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
      <Table dark className="matches-table">
        <thead>
          <tr>
            <th>Start Time</th>
            <th>Date</th>
            <th>Field</th>
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
              <td>{match.teams[0].name} - {match.teams[1].name} </td>
              {/* <td>{match.teams[0]</td> */}


                <td className="teams-cell">{match.teams.map((team, index) => (
                <td className="teams-cell-specific" key={index}> 
                  <td>{team.name}</td>
                </td>
              ))}</td>
              
              {/* <td>{match.teams.map((team, index) => (
                <tbody key={index}>
                  <td>{team.name}</td>
                </tbody>
              ))}</td> */}



            </tr>
          </tbody>
        ))}


{/* 
           {teamMembers.map((member, i) => (
            <tbody key={i}>
              <tr className="playersTable">
                <td>{member.name}</td>
                <td>{member.subRole}</td>
                <td>{member.email}</td>
                <td>{member.phoneNumber}</td>
              </tr>
            </tbody>
          ))} */}


      </Table>
      <ul>
        {matches.map((match, index) => {
          return <li className="matches-card" key={index}>{match.result} {match.matchType} {match.teams.map((team, index) => {
            return <li key={index}>{team.name}</li> 
          })} </li>
        })}
      </ul>
       {/* <ul>
          {matches['teams'].map((team, index) => {
            return <li key={index}>{team}</li>
          })}
        </ul> */}
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
     
 


    
   