import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Col, Jumbotron, Container } from "reactstrap";
import mongoosy from "mongoosy/frontend";

export default function NewTeam() {
  const [clubName, setClubName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamGender, setTeamGender] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const { Team } = mongoosy;

  // Create a new admin and save to db
  async function addTeam() {
    let aTeam = new Team({
      club: clubName,
      name: teamName,
      gender: teamGender,
      age: ageGroup,
    });
    await aTeam.save();
    console.log("aTeam", aTeam.js);

    let allTeams = await Team.find();
    console.log('allTeams', allTeams.js);
  }

  



  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <Form>
            <FormGroup className="col-sm-10 col-md-6 col-lg-4">
              <Col>
                <Input
                  type="name"
                  className="teamFormInput"
                  placeholder="Club name"
                  autoComplete="off"
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup className="col-sm-10 col-md-6 col-lg-4">
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
            <FormGroup className="col-sm-10 col-md-6 col-lg-4">
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
                  <option>Man</option>
                  <option>Woman</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup className="col-sm-10 col-md-6 col-lg-4">
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
            </FormGroup>
            <FormGroup>
              <Button className="ml-4" onClick={addTeam}>Confirm</Button>
            </FormGroup>
          </Form>
        </Container>
      </Jumbotron>
    </div>
  );
}
