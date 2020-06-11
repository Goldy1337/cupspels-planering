import React, { useState, useContext } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Col,
  Jumbotron,
  Container,
  Row
} from "reactstrap";
import mongoosy from "mongoosy/frontend";
import { GlobalContext } from "../contexts/GlobalContextProvider";

export default function NewTeam(props) {
  const [clubName, setClubName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamGender, setTeamGender] = useState('N/A');
  const [ageGroup, setAgeGroup] = useState('');
  const { colorTheme } = useContext(GlobalContext);
  const { Team } = mongoosy;

  async function addTeam() {
    let aTeam = new Team({
      club: clubName,
      name: teamName,
      gender: teamGender,
      age: ageGroup,
      cups: props.cupInfo.id
    });
    await aTeam.save();
    console.log("aTeam", aTeam._id);

    let allTeams = await Team.find();
    console.log("allTeams", allTeams.js);

    props.history.push("/addTeamMember/" + aTeam._id);
  }

  // async function clearTeams(){
  //    let allTeams = await Team.find();

  //   await Team.deleteMany({});
  //   console.log("clear", allTeams.js);
  // }

  return (
    <div>
      <Jumbotron fluid>
              <h4 style={{textAlign: 'center', marginBottom: '30px', opacity: '0.7'}}>Team Details</h4>
          <Container fluid>
            <Form>
              <FormGroup>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <Input
                    type="name"
                    className="teamFormInput mb-3"
                    placeholder="Club name"
                    autoComplete="off"
                    value={clubName}
                    onChange={(e) => setClubName(e.target.value)}
                  />
                  <Input
                    type="name"
                    id="teamName"
                    className="teamFormInput mb-3"
                    placeholder="Team name"
                    autoComplete="off"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                  <Input
                    type="select"
                    className="teamFormInput mb-3"
                    id="teamGender"
                    value={teamGender}
                    onChange={(e) => setTeamGender(e.target.value)}
                  >
                    <option>N/A</option>
                    <option>Mixed</option>
                    <option>Male</option>
                    <option>Female</option>
                  </Input>
                  <Input
                    type="age"
                    id="ageGroup"
                    className="teamFormInput mb-3"
                    autoComplete="off"
                    placeholder="Age group"
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                  />
                  </Col>
                </Row>
              </FormGroup>
              {/* <FormGroup className="col-sm-12 col-md-6 offset-md-3">
                <Col>
                  <Input
                    type="name"
                    id="teamName"
                    className="teamFormInput"
                    placeholder="Team name"
                    autoComplete="off"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </Col>
              </FormGroup>
              <FormGroup className="col-sm-12 col-md-6 offset-md-3">
                <Col>
                  <Input
                    type="select"
                    className="teamFormInput"
                    id="teamGender"
                    value={teamGender}
                    onChange={(e) => setTeamGender(e.target.value)}
                  >
                    <option>N/A</option>
                    <option>Mixed</option>
                    <option>Male</option>
                    <option>Female</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup className="col-sm-12 col-md-6 offset-md-3">
                <Col>
                  <Input
                    type="age"
                    id="ageGroup"
                    className="teamFormInput"
                    autoComplete="off"
                    placeholder="Age group"
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                  />
                </Col>
              </FormGroup> */}
              <FormGroup align="center">
                <Button onClick={addTeam} color={colorTheme} size="lg">Confirm</Button>
                {/* <Button onClick={clearTeams} color={colorTheme}>Clear</Button> */}
              </FormGroup>
            </Form>
          </Container>
          </Jumbotron>
    </div>
  );
}
