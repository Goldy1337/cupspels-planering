import React, { useState, useContext, useEffect } from 'react'
import { Button, Form, FormGroup, Input, Col } from 'reactstrap'
import { MatchContext } from '../contexts/MatchContextProvider'
import { teamContext, TeamContext } from '../contexts/TeamContextProvider'

import mongoosy from 'mongoosy/frontend';
//import Team from './Brackets';
const {
  Cup,
  Match,
  Arena,
  Field,
  Team
} = mongoosy;


// Sortera matcher; samma ålder, cupId, kön...
// TODO: inte möta egna laget; team1 vs team1 

function NewMatch() {

  const { appendMatch, createMatch } = useContext(MatchContext)
  const [newMatch, setNewMatch] = useState({ matchType: '', duration: 0, teams: [], field: ''})
  const { teams } = useContext(TeamContext)
  const [cup, setCup] = useState()
  const [teamsInCup, setTeamsInCup] = useState([]) 
  const [fieldsInCup, setFieldsInCup] = useState([])
  const [availableFields, setAvailableFields] = useState([])

  const [currentTime] = useState("2020-01-01T00:00")

  const updateMatch = update => setNewMatch({ ...newMatch, ...update })

  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(() => {
    //uploadData()
    //Match.removeAll({ cup: "5ec2f7915c58b4ee74925cd8" })
    //deleteGroupData()
    //fetchTeams("5ec2f7915c58b4ee74925cd8")
    Test()
    //fetchTeams("5ec2c4c65c58b4ee74925c4e")
  }, [])

  const Test = async () => {

    let field1 = await Field.findOne({ _id: "5eaab104fc3b6a091bfe0c08" })
    let field2 = await Field.finOne({ _id: "5eb96271c5ec404db8be6c5f" })
    let field3 = await Field.finOne({ _id: "5ebaac43c5ec404db8be6c7d" })
  
    let date = new Date()
    date.setHours(3)

    let match = new Match({
      fieldId: field1._id,
      result: "0-0",
      matchType: "Quarter final",
      date: date,
      startTime: date,
      duration: 90,
      activeTeamSize: 11,      
    })

    //await match.save()

    let date2 = new Date()
    date.setHours(2)

    let match2 = new Match({
      fieldId: field1._id,
      result: "0-0",
      matchType: "Semi Final",
      date: date,
      startTime: date,
      duration: 90,
      activeTeamSize: 11,
    })
    
    //await match2.save()



    let fields = [field1] //, field2, field3]

    let team1 = new Team({
      club: "Lakers",
      name: "Lakers Junior Team",
      gender: "Mixed",
      age: 11,
    })

    let team2 = new Team({
      club: "Oceans",
      name: "Oceans Junior Team",
      gender: "Mixed",
      age: 11,
    })

    let team3 = new Team({
      club: "Rivers",
      name: "Rivers Junior Team",
      gender: "Mixed",
      age: 11,
    })

    let teams = [team1, team2, team3]

    createMatch(teams, fields)
  }

  const addMatch = (e) => {
    e.preventDefault();
    
    // if (!lastName.trim() || !firstName.trim() || !email.trim() || !phoneNumber.trim() || !password.trim()) {
    //   return
    // }
    // const referee = {
    //   firstName,
    //   lastName,
    //   email,
    //   password,
    //   phoneNumber
    // }


    //sendToDatabase(referee)

    // setFirstName('')
    // setLastName('')
    // setEmail('')
    // setPassword('')
    // setPhoneNumber('')
  }


  const uploadData = async () => {


    let newArena = new Arena({
      name: "Large arena",
      organizer: "ICA",
      capacity: 2000,
      homeTeam: "Maxi",
      // cups: [{ type: Types.ObjectId, ref: 'Cup' }],
      // fields: [{type: Types.ObjectId, ref: 'Field'}]
    }) 

    let startDate = new Date()
    let endDate = new Date()
    endDate.setMonth(4)

    let newCup = new Cup({
      name: "New Cup Basic",
      organizer: "ICA",
      startDate: startDate,
      endDate: endDate,
      //teams: [ ],
      //arenas: [newArena._id]
    })

    let newField1 = new Field({
      arenaId: newArena._id,
      name: "Field 1",
      size: "2000x1000",
      surface: "Grass",
      outdoors: "Outdoors"
    })

    let newField2 = new Field({
      arenaId: newArena._id,
      name: "Field 2",
      size: "200x100",
      surface: "Grass",
      outdoors: "Outdoors"
    })

      let newField3 = new Field({
      arenaId: newArena._id,
      name: "Field 3",
      size: "600x300",
      surface: "Grass",
      outdoors: "Outdoors"
    })

    newArena.cups = [newCup._id]
    newArena.fields = [newField1._id, newField2._id, newField3._id]
    newCup.arenas = [newArena._id]

    console.log("ID: ",newCup._id)

    await newArena.save()
    await newCup.save()
    await newField1.save()
    await newField2.save()
    await newField3.save()

    console.log("Cup: ", cup)
  }


  
  
  const fetchTeams = async (cupId) => {


    // class CreateMatch { }
    // let matchCreator = new CreateMatch("sej", "sad")
    // matchCreator.createMatch("Hey", "Swyg")
    //CreateMatch.createMatch("Hey", "swejs")




    let cup = await Cup.findOne({ _id: cupId}).populate('teams').populate('arenas').populate('fields').exec() // TODO: pass in id instead?
    setCup(cup)
    setTeamsInCup(cup.teams)
    console.log("CUP ARENAS", cup)
    //setFieldsInCup(cup.arenas[0].fields)


    let cups = await Cup.find()
    console.log("CUPS", cups)

    //checkFieldAvailability()
  }


  // TODO: fetcha bara relevanta matcher (samma cup id? eller samma plan id?)
  const fetchMatches = async () => {
   // let matches = await Match.find
  }


  // const createMatch = () => {

  // }


  const matchTimeIsOverlapping = (a, b) => {
   
    if (a.endTime >= b.startTime && a.startTime <= b.endTime ||
      a.startTime <= b.endTime && a.endTime >= b.startTime) { return true }

    // if (a.startTime <= b.startTime && b.startTime <= a.endTime) { return true }
    // if (a.startTime <= b.endTime && b.endTime <= a.endTime) { return true }
    // if (b.startTime < a.startTime && a.endTime < b.endTime) { return true }
    return false
  }


  // Skapa matcher i koden
  const checkFieldAvailability = async () => {
    // TODO: jämför match med dem i databasen... kolla om:
    // matchens start tid plus duration (plus lite extra tid) är mindre än starttiden för andra matcheran 
    // OCH om matchens starttid plus duration är större än dem andra matchernas starttider (plus duration)



    let field = new Field ({
    name: "The Big Blue",
    size: "200x150",
    surface: "Grass",
    outdoors: true
    });


    let date = new Date()

    console.log("Data of this match: " + date)
    
    let newMatch = new Match({
      fieldId: field._id,
       result: "0-0",
       matchType: "Test",
       date: date,
       startTime: date,
       duration: 90,
       activeTeamSize: 11,
    })


    // TODO: fetcha innan?
    // fetcha med cupid elelr 
    let matches = await Match.find({ fieldId: newMatch.fieldId})



    let startTime = newMatch.startTime

    let endTime = newMatch.startTime
    endTime.setMinutes(endTime.getMinutes() + newMatch.duration)

    let time1 = {
      startTime: 100,//startTime.getTime(),
      endTime: 140 //endTime.getTime()
    }
    console.log("Time1: ",time1)



    let startTime2 = new Date()
    startTime2.setMinutes(30)
    let endTime2 = startTime2
    endTime2.setMinutes(endTime2.getMinutes() + newMatch.duration)

    let time2 = {
      startTime:  140,// startTime2.getTime(),
      endTime: 180 // endTime2.getTime()
    }



    // let startTime3 = startTime
    // startTime3.setHours(3)
    // let endTime3 = startTime3.setMinutes()
    // endTime3.setMinutes(endTime3.getMinutes() + newMatch.duration)

    // console.log("start time 3: ", startTime3)
    // console.log("end time 3: ", endTime3)

    // let time3 = {
    //   startTime: startTime3,
    //   endTime: endTime3
    // }

    // console.log(time1)
    // console.log(time2)
    // console.log(time3)
    // console.log(time2.startTime.getTime())
        console.log(time1, time2)

    console.log("Overlapping?: ", matchTimeIsOverlapping(time1, time2))
    console.log(teamsInCup.length)
    // KOlla om fieldId är samma, samt om sluttiden är större än den andras starttid och startid är mindra än den andra

    // TODO: Check matches in cup instead
    for (let i = 0; i < teamsInCup.length; i++) {
      console.log("hey")
      if (newMatch.fieldId = teamsInCup[i].fieldId) {

        // FUNCTION PINTER ANVÄND HÄR!!
        if (matchTimeIsOverlapping(time1, time2)) {
            // Om inte append
          console.log("is overlaping")
        } else {
          console.log("is not overlaoing")
          teamsInCup.push(newMatch)
        }

      }

     // console.log("Team:" + )
      /*
      .filter(function (match) {
            let endTime = new Date(match.startTime)
            endTime.setMinutes(endTime.getMinutes() + match.duration)
            return endTime.toISOString() > new Date().toISOString() })
            */
      
      //if (startTime < team)
    }

  }


  // async function sendToDatabase(referee) {

  //   // Create a new referee and save to db
  //   let newReferee = new User({
  //     name: referee.lastName + ' ' + referee.firstName,
  //     role: "Referee",
  //     email: referee.email,
  //     phoneNumber: referee.phoneNumber,
  //     password: referee.password,
  //     salt: "salty-b"
  //   });
    

  //   await newReferee.save();
  //   appendReferee(newReferee)

  // }

  /*
    activeTeamSize: {type: Number, required: true},
    teams: [{ type: Types.ObjectId, ref: 'Team' }],
    fetcha alla teams med cupId
  */

  return (
    <div className="" style={{backgroundColor: 'white'}}>
      <h2 class="">New Match</h2>
      <Form
        onSubmit={addMatch}
        className="">
        <h5 class="enter-name-title">Enter type of match:</h5>
        <div class="">
          <FormGroup className="col-sm-12 col-md-8 col-lg-6">
            <label for="match-type">Match Type</label>
            <Input
              required
              type="text"
              id="match-type"
              class="match-type"
              placeholder="Group play, quarter final, semi final, etc..."
              value={newMatch.matchType}
              onChange={e => updateMatch({ matchType: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <label>Time and Date</label>
            <Input
              id="datetime-local"
              label="Time and date"
              type="datetime-local"
              defaultValue={currentTime}
            />
          </FormGroup>
          <FormGroup>
            <label>Duration of game (in mins)</label>
            <Input
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <label>Number of players per team</label>
            <Input
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <label>Pick Home Team</label>
             <Col>
                <Input
                  type="select"
                  className="teamFormInput"
                  id="team1"
                  value={"Team 1"} // TODO: FIX!!
                  onChange={(e) => updateMatch({ teams: e.target.value })}>

                {teamsInCup.map((team, i) => (
                  <option>{team.name}</option>
                ))}
                </Input>
              </Col>
          </FormGroup>
            <FormGroup>
            <label>Pick Away Team</label>
             <Col>
                <Input
                  type="select"
                  className="teamFormInput"
                  id="team2"
                  value={"Team 3"} // TODO: FIX!!
                  onChange={(e) => updateMatch({ teams: e.target.value })}>

                {teamsInCup.map((team, i) => (
                  <option>{team.name}</option>
                ))}
                </Input>
              </Col>
          </FormGroup>
          <FormGroup>
            <label>Chose Field</label>
            <Col>
              <Input
                type="select"
                className="fieldFormInput"
                id="selected-field"
                value={"field2"}
                onChange={e => updateMatch({ field: e.target.value })}>
                {availableFields.map((field, i) => (
                  <option>{field.name}</option>
                ))}
              </Input>
            </Col>
          </FormGroup>
        </div>
        <div class="button-container">
          <Button color="info" className="m1-3 form-btn">Add Match</Button>
        </div>
      </Form>
    </div>

  )
}

export default NewMatch
