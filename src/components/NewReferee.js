import React, { useState, useContext } from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap'
import RefereeList from './RefereeList'
import mongoosy from 'mongoosy/frontend';
import { GlobalContext } from '../contexts/GlobalContextProvider';
const {
  User
} = mongoosy;

function NewReferee() {

  const { appendReferee } = useContext(GlobalContext)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const addReferee = (e) => {
    e.preventDefault();
    
    if (!lastName.trim() || !firstName.trim() || !email.trim() || !phoneNumber.trim() || !password.trim()) {
      return
    }
    const referee = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber
    }

    console.log(referee)

    sendToDatabase(referee)

    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setPhoneNumber('')
  }

  async function sendToDatabase(referee) {

    // Create a new referee and save to db
    let newReferee = new User({
      name: referee.lastName + ' ' + referee.firstName,
      role: "Referee",
      email: referee.email,
      phoneNumber: referee.phoneNumber,
      password: referee.password,
      salt: "salty-b"
    });
    

    await newReferee.save();
    appendReferee(newReferee)

  }

  return (
    <div class="referee-form">

      <h2 class="form-title">New Referee</h2>
      <Form
        onSubmit={addReferee}
        className="form">
        <h5 class="enter-name-title">Enter full name:</h5>
        <div class="name-fields">
           <FormGroup className="col-sm-12 col-md-8 col-lg-6">
            <Input
              required
              type="text"
              id="referee-firstName"
              class="referee-firstName"
              value={firstName}
              onChange={e => setFirstName(e.target.value)} />
              <label for="referee-firstName">First name</label>
          </FormGroup>

          <FormGroup className="col-sm-12 col-md-8 col-lg-6 group-lastname">
            <Input
              required
              type="text"
                id="referee-lastName"
                class="referee-lastName"
              value={lastName}
              onChange={e => setLastName(e.target.value)} />
              <label for="referee-lastName">Last name</label>
          </FormGroup>
        </div>
        <h5 className="contact-title">Contact Details:</h5>
        <FormGroup className="col-sm-12 col-md-8 col-lg-6">
          <label for="referee-firstName">Email</label>
          <Input
            required
            type="email"
            id="referee-email"
            placeholder="Example@gmail.com"
            value={email}
            onChange={e => setEmail(e.target.value)}/>
          <label for="referee-password">Password</label>
          <Input
            required
            type="password"
            id="referee-password"
            value={password}
            onChange={e => setPassword(e.target.value)}/>
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
        <div class="button-container">
          <Button color="info" className="m1-3 form-btn">Add Referee</Button>
        </div>
      </Form>
      <RefereeList />
    </div>

  )
}

export default NewReferee
