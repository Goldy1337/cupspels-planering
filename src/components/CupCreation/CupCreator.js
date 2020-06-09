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
import mongoosy from 'mongoosy/frontend';
const {
  Cup
} = mongoosy;

export default function CupCreator() {
  const [cupInfo, setCupInfo] = useState({
    name: "",
    organizer: "",
    organizers: [],
    startDate: "",
    endDate: "",
  });

  const updateCupInfo = (update) => {
    setCupInfo({...cupInfo, ...update})
  }

  const [states, setStates] = useState({
    cupMenu: true,
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


  const createCup = async (e) => {
    e.preventDefault()
    cupInfo.organizers = cupInfo.organizer.replace(" ", "").split(",")
    console.log(cupInfo)

    let newCup = new Cup({
      name: cupInfo.name,
      organizer: cupInfo.organizer,
      startDate: cupInfo.startDate,
      endDate: cupInfo.endDate,
    })

    await newCup.save()
    
    //let cups = await Cup.find()
    //console.log(cups)
  }

  const getOrganizers = (text) => {
    let array = text.split(",")
    cupInfo.organizers = array
  }

  return (
    <div>
      <h2 style={{textAlign: 'center', color: 'white', padding: '20px', textDecoration: 'underline'}}>Set up Cup</h2>
      <Jumbotron style={{ width: '60vw', margin: 'auto', paddingTop: '40px' }} fluid>
        <h4 style={{textAlign: 'center', marginBottom: '30px', opacity: '0.7'}}>Cup Details</h4>
        <Container style={{display: 'flex', justifyContent: 'center'}} fluid>
          <Form onSubmit={e => createCup(e)}>
            <FormGroup className="col-sm-10 col-md-6 col-lg-4">
              <Col>
                <Label style={{margin: '0px'}}>Name of cup</Label>
                <Input
                  style={{ width: '40vw' }}
                  required
                  placeholder="Cup name..."
                  value={cupInfo.name}
                  onChange={(e) => updateCupInfo({name: e.target.value})}
                />
                
              </Col>
            </FormGroup>
            <FormGroup className="col-sm-10 col-md-6 col-lg-4">
              <Col>
                <Label style={{margin: '0px'}}>Name of organizers</Label>
                <Input
                  style={{ width: '40vw' }}
                  required
                  placeholder="Name of cup organizers..."
                  value={cupInfo.organizer}
                  onChange={(e) => updateCupInfo({organizer: e.target.value})}
                />
              </Col>
            </FormGroup>
            <div style={{display: 'flex'}}>
              <FormGroup className="col-sm-10 col-md-6 col-lg-4">
                <Col>
                  <Label style={{marginBottom: '0px'}}>Start date:</Label>
                  <Input
                    // style={{width: '20vw'}}
                    type="datetime-local"
                    required
                    value={cupInfo.startDate}
                    onChange={ e => updateCupInfo({startDate: e.target.value})}
                  />                  
                </Col>
              </FormGroup>
              <FormGroup className="col-sm-10 col-md-6 col-lg-4">
                <Col>
                  <Label for="end-date" style={{marginBottom: '0px'}}>End date:</Label>
                  <Input
                    id="end-date"
                    required
                    type="datetime-local"
                    value={cupInfo.endDate}
                    onChange={ e => updateCupInfo({endDate: e.target.value})}
                  />
                </Col>
              </FormGroup>
            </div>
       
            <FormGroup style={{display: 'flex', justifyContent: 'center', paddingTop: '30px', marginBottom: '0px'}} >
              <Button style={{ width: '10vw' }} className="ml-4">Confirm</Button>
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