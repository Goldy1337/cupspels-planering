import React, { useState, useContext } from "react";
import { Collapse, Card, CardBody, Button, Col, FormGroup, Form, Input, Table } from 'reactstrap'
import mongoosy from "mongoosy/frontend";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";

const NewTeamMember = (props) => {
 const {User} = mongoosy;
 const {Team} = mongoosy;  
 const {appendUser} = useContext(UserContext)

  const [name, setPlayerName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [subrole, setSubrole] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [newMember, setMember] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);

  let {id} = useParams()

  const toggle = () => setIsOpen(!isOpen);
  const generatePassword = () => setPassword(Math.random().toString(36).slice(-8))

  async function getTeamName(){
    
  let foundTeam = await Team.findOne({ _id: id });
  setTeamName(foundTeam.name);
  }

  const addTeamMember = async (e) =>{

    e.preventDefault()
    generatePassword()

    let aMember = new User({
      teamId: id,
      name: name,
      role: "Participant",
      subrole: subrole,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      salt: "hej"
    });

    await aMember.save();
    console.log("aMember", aMember.js);
    setMember(aMember)


    getTeamMembers();

    setPlayerName('')
    setEmail('')
    setPhoneNumber('')
    setSubrole('')
  }

  const getTeamMembers = async () =>{
    
    let teamUsers = await User.find({teamId: id});
    console.log("team ", teamUsers)

    setTeamMembers(teamUsers)

  }

  // getTeamMembers();
  // async function getTeamMembers(){
  //   let foundTeamMember = await User.find({ id: User.teamId });
  //   console.log('foundTeam', foundTeamMember.js);
  // }

  //  appendTeamMember = (newMember) => {
  //    setTeamMembers = ([...teamMembers, newMember])
  //   }



  getTeamName();

  return (
    <div>
      <h1>{teamName}</h1>
      <Table dark>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Position</th>
          <th>Email</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      {teamMembers.map((member) =>
      <tbody>
        <tr>
          <th scope="row"></th>
          <td>{member.User.name}</td>
          <td>{member.User.role}</td>
      <td>{member.User.email}</td>
      <td>{member.User.phone}</td>
        </tr>
        </tbody>
       ) }
        </Table>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <div>Please enter player info:</div>
            <Form autoComplete="off">
              <FormGroup className="col-sm-10 col-md-6 col-lg-4">
                <Col>
                  <Input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setPlayerName(e.target.value)}
                  />
                </Col>
              </FormGroup>
              <FormGroup className="col-sm-10 col-md-6 col-lg-4">
                <Col>
                  <Input
                    placeholder="Position"
                    value={subrole}
                    onChange={(e) => setSubrole(e.target.value)}
                  />
                </Col>
              </FormGroup>
              <FormGroup className="col-sm-10 col-md-6 col-lg-4">
                <Col>
                  <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Input>
                </Col>
              </FormGroup>
              <FormGroup className="col-sm-10 col-md-6 col-lg-4">
                <Col>
                  <Input
                    placeholder="Phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Button className="ml-4" onClick={addTeamMember}>
                  Add
                </Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Collapse>
      <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }}>
        Add player +
      </Button>
    </div>
  );

}
export default NewTeamMember