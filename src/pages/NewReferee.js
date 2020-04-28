import React, { useState, useContext } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { RefereeContext } from '../contexts/RefereeContextProvider'
import mongoosy from 'mongoosy/frontend';
import { userInfo } from 'os';
// import { withRouter } from 'react-router-dom'
const {
  User
} = mongoosy;

//const NewReferee = (props) => {
const NewReferee = () => {

  const { appendReferee } = useContext(RefereeContext)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const addReferee = (e) => {
    e.preventDefault();
    
    if (!lastName.trim() || !firstName.trim() || !email.trim() || !phoneNumber.trim()) {
      return
    }

    const referee = {
      firstName,
      lastName,
      email,
      phoneNumber
    }

    console.log(referee)

    appendReferee(referee)


    sendToDatabase(referee)

    setFirstName('')
    setLastName('')
    setEmail('')
    setPhoneNumber('')
  }

  async function sendToDatabase(referee) {
  //const sendToDatabase = (e) => {

     //e.preventDefault();
    
    console.log(referee.firstName)
    // Create a new referee and save to db
    let newReferee = new User({
      name: referee.lastName + ' ' + referee.firstName,
      role: "Referee",
      email: referee.email,
      phoneNumber: referee.phoneNumber,
      password: "secret",
      salt: "salty-b"
    });
    
    await newReferee.save();

    console.log('newReferee', newReferee.js); // after saving the team it has an id

    // Read that team again from the db
    let foundReferee = await User.findOne({ _id: newReferee._id });
    console.log('found referee', foundReferee.js);

    // Read all teams from the db
    let allReferees = await User.find();
    
    console.log('all Referees', allReferees.js);
  }

  return (
    <div>

      <h2>New Referee</h2>
      <Form
        onSubmit={addReferee}
        className="row">
        <FormGroup className="col-sm-12 col-md-8 col-lg-6">
          <label for="referee-lastName">Last name</label>
          <Input
            required
            type="text"
            id="referee-lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="col-sm-12 col-md-8 col-lg-6">
          <label for="referee-firstName">First name</label>
          <Input
            required
            type="text"
            id="referee-firstName"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="col-sm-12 col-md-8 col-lg-6">
          <label for="referee-firstName">Email</label>
          <Input
            required
            type="email"
            id="referee-email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="col-sm-12 col-md-8 col-lg-6">
          <label for="referee-firstName">Phone number</label>
          <Input
            required
            type="text"
            id="referee-phoneNumber"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
          />
        </FormGroup>
        <Button color="info" className="m1-3">Add Referee</Button>
      </Form>

    </div>

  )
}

export default NewReferee
//export default withRouter(NewReferee)