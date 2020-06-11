import React, { useState, useContext, useEffect } from "react";
import {UserContext} from '../contexts/UserContextProvider'
import {
  Collapse,
  Card,
  CardBody,
  Button,
  Col,
  FormGroup,
  Form,
  Input,
  Table,
} from "reactstrap";
import mongoosy from "mongoosy/frontend";
import { useParams } from "react-router-dom";
import "../scss/_variable-overrides.scss";
import { GlobalContext } from "../contexts/GlobalContextProvider";

const NewTeamMember = () => {
  const { User } = mongoosy;
  const { Team } = mongoosy;
  //const { appendUser, saveUser } = useContext(GlobalContext);
  const { appendUser, saveUser } = useContext(UserContext)

  const [name, setPlayerName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subRole, setSubRole] = useState("");
  const [password, setPassword] = useState("");
  const [salt, setSalt] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  let { id } = useParams();

  const toggle = () => setIsOpen(!isOpen);
  const generatePassword = () =>
    setPassword(Math.random().toString(36).slice(-8));
  const generateSalt = () => setSalt(Math.random().toString(36).slice(-8));

  useEffect(() => {
    getTeamName();
    getTeamMembers();
    generateSalt();
    generatePassword();
  }, []);

  async function getTeamName() {
    let foundTeam = await Team.findOne({ _id: id });
    setTeamName(foundTeam.name);
  }

  const addTeamMember = async (e) => {
    e.preventDefault();

    let aMember = new User({
      teamId: id,
      name: name,
      role: "Participant",
      subRole: subRole,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      salt: salt,
    });

    appendUser(aMember);
    saveUser(aMember);

    getTeamMembers();
    console.log("team members: ", teamMembers);

    setPlayerName("");
    setEmail("");
    setPhoneNumber("");
    setSubRole("");
    generatePassword();
  };

  const getTeamMembers = async () => {
    let teamUsers = await User.find({ teamId: id });
    setTeamMembers(teamUsers);
  };

  return (
    <div>
      <h1>{teamName}</h1>
      {teamMembers[0] ? (
        <Table dark>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          {teamMembers.map((member, i) => (
            <tbody key={i}>
              <tr className="playersTable">
                <td>{member.name}</td>
                <td>{member.subRole}</td>
                <td>{member.email}</td>
                <td>{member.phoneNumber}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      ) : (
        ""
      )}
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
                    value={subRole}
                    onChange={(e) => setSubRole(e.target.value)}
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
};
export default NewTeamMember;
