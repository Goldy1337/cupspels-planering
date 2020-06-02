import React, { useState, useContext, useEffect } from 'react'
import { Button, Form, FormGroup, Input, Col } from 'reactstrap'
import { MatchContext } from '../contexts/MatchContextProvider'
import { teamContext, TeamContext } from '../contexts/TeamContextProvider'
//import RefereeList from './RefereeList'
import mongoosy from 'mongoosy/frontend';
const {
  Cup,
  Match,
  Arena,
  Field
} = mongoosy;


// Sortera matcher; samma ålder, cupId, kön...

function NewReferee() {

  const { appendMatch } = useContext(MatchContext)
  const [newMatch, setNewMatch] = useState({ matchType: '', duration: 0, teams: [] })
  const { teams } = useContext(TeamContext)
  const [cup, setCup] = useState()
  const [teamsInCup, setTeamsInCup] = useState([]) 



const [currentTime] = useState("2020-01-01T00:00")

  const updateMatch = update => setNewMatch({ ...newMatch, ...update })

  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [phoneNumber, setPhoneNumber] = useState('')

    useEffect(() => {
    //Match.removeAll({ cup: "5ec2f7915c58b4ee74925cd8" })
    //deleteGroupData()
    fetchTeams("5ec2f7915c58b4ee74925cd8")
  }, [])

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



  const fetchTeams = async (cupId) => {
    let cup = await Cup.findOne({ _id: cupId}).populate('teams').exec() // TODO: pass in id instead?
    setCup(cup)
    setTeamsInCup(cup.teams)
    console.log(cup.teams)
    checkFieldAvailability()
  }


  // TODO: fetcha bara relevanta matcher (samma cup id? eller samma plan id?)
  const fetchMatches = async () => {
   // let matches = await Match.find
  }


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
    
    let m = new Match({
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
    let matches = await Match.find({ fieldId: m.fieldId})



    let startTime = m.startTime
    console.log("Start time", startTime)

    let endtime = m.startTime
    endtime.setMinutes(endtime.getMinutes() + m.duration)
    console.log("start time 2", endtime)

    // KOlla om fieldId är samma, samt om sluttiden är större än den andras starttid och startid är mindra än den andra
    for (let i = 0; i < teamsInCup.length; i++) {
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
    <div class="">

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
                  id="teamGender"
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
                  id="teamGender"
                  value={"Team 3"} // TODO: FIX!!
                  onChange={(e) => updateMatch({ teams: e.target.value })}>

                {teamsInCup.map((team, i) => (
                  <option>{team.name}</option>
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

export default NewReferee
