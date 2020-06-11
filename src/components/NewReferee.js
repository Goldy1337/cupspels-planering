import React, { useState, useContext } from 'react'
import { Button, Form, FormGroup, Input, Col, Jumbotron, Container, Row  } from 'reactstrap'
import RefereeList from './RefereeList'
import mongoosy from 'mongoosy/frontend';
import { GlobalContext } from '../contexts/GlobalContextProvider';
const {
  User
} = mongoosy;

function NewReferee() {

  const { appendReferee, colorTheme } = useContext(GlobalContext)
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
      salt: "salty-b" //TODO remove salt from users
    });
    

    await newReferee.save();
    appendReferee(newReferee)

  }

  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <Form onSubmit={addReferee}>
            <FormGroup>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <Input
                    required
                    type="text"
                    placeholder="First Name"
                    id="referee-firstName"
                    className="mb-3"
                    class="referee-firstName"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)} />
                    {/* <label for="referee-firstName">First name</label> */}
                  <Input
                    required
                    type="text"
                    placeholder="Last Name"
                    id="referee-lastName"
                    className="mb-3"
                    class="referee-lastName"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)} />
                    {/* <label for="referee-lastName">Last name</label> */}
                  {/* <h5 className="contact-title">Contact Details:</h5>
                  <label for="referee-firstName">Email</label> */}
                  <Input
                    required
                    type="email"
                    placeholder="Email"
                    id="referee-email"
                    className="mb-3"
                    placeholder="Example@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>
                  {/* <label for="referee-password">Password</label> */}
                  <Input
                    required
                    type="password"
                    placeholder="Password"
                    id="referee-password"
                    className="mb-3"
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>
                  {/* <label for="referee-firstName">Phone number</label> */}
                  <Input
                    required
                    type="text"
                    placeholder="Phone Number"
                    id="referee-phoneNumber"
                    className="mb-3"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                  />
                  <FormGroup align="center">
                    <Button color={colorTheme} size="lg">Add Referee</Button>
                  </FormGroup>
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </Container>
      </Jumbotron>
    <RefereeList />
   </div>

  )
}

export default NewReferee
