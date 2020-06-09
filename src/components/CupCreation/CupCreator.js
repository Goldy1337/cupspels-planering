import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Col,
  Jumbotron,
  Container,
  Label
} from "reactstrap";
import TeamsModule from "../NewTeam";
import ArenaModule from "../NewArena";

export default function CupCreator() {
  const [cupInfo, setCupInfo] = useState({
    name: "",
    organizer: [],
    startDate: "",
    endDate: "",
  });

  const [states, setStates] = useState({
    arenaMenu: false,
    teamsMenu: false,
    generateMatchMenu: false,
  });

  const updateStates = (updates) => {
    setStates({ ...states, ...updates });
  };

  const toggleMenu = (state) => {
    updateStates({ [state]: !states[state] });
  };

  const createCup = () => {
    
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center', color: 'white', padding: '20px', textDecoration: 'underline' }}>Set up Cup</h2>
      <Jumbotron style={{ width: '60vw', margin: 'auto', paddingTop: '40px' }} fluid>
        <h4 style={{textAlign: 'center', marginBottom: '30px'}}>Enter cup details</h4>
        <Container style={{display: 'flex', justifyContent: 'center'}} fluid>
          <Form>
            <FormGroup className="col-sm-10 col-md-6 col-lg-4">
              <Col>
                <Input style={{width: '40vw'}} placeholder="Cup name..."/>
              </Col>
            </FormGroup>
            <FormGroup className="col-sm-10 col-md-6 col-lg-4">
              <Col>
                <Input style={{width: '40vw'}} placeholder="Name of cup organizers..."/>
              </Col>
            </FormGroup>
            <div style={{display: 'flex'}}>
              <FormGroup className="col-sm-10 col-md-6 col-lg-4">
                <Col>
                  <Label style={{marginBottom: '0px'}}>Start date:</Label>
                  <Input
                    type="datetime-local"
                    value={"2020-01-01T00:00"}
                  />                  
                </Col>
              </FormGroup>
              <FormGroup className="col-sm-10 col-md-6 col-lg-4">
                <Col>
                  <Label for="end-date" style={{marginBottom: '0px'}}>End date:</Label>
                  <Input
                    id="end-date"
                    type="datetime-local"
                    value={"2020-01-01T00:00"}
                  />
                </Col>
              </FormGroup>
            </div>
       
            <FormGroup style={{display: 'flex', justifyContent: 'center', paddingTop: '30px', marginBottom: '0px'}} >
              <Button style={{width: '10vw'}} className="ml-4">Confirm</Button>
            </FormGroup>
          </Form>
        </Container>
      </Jumbotron>
      <div style={{ textAlign: "center" }}>
        <button onClick={() => toggleMenu("arenaMenu")}>Add Arenas</button>
        <button onClick={() => toggleMenu("teamsMenu")}>Add Teams</button>
        <button onClick={() => toggleMenu("generateMatchMenu")}>
          Generate Matches
        </button>
        <div style={{}}>{states.teamsMenu ? <TeamsModule /> : <></>}</div>
        <div style={{}}>{states.arenaMenu ? <ArenaModule /> : <></>}</div>
      </div>
   
    </div>
  );
}