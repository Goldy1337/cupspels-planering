import React, { useState, useContext, useEffect } from 'react'
import { Button, Form, FormGroup, Input, Jumbotron, Label, Row, Col, Container } from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
import SearchAddress from "./SearchAddress";
import ArenaList from './ArenaList'
import NewField from './NewField'
import { GlobalContext } from "../contexts/GlobalContextProvider";
const { Arena } = mongoosy;

export default function NewArena(props) {
  const { appendArena, colorTheme } = useContext(GlobalContext);


  // const [cup, setCup] = useState({name: '', id: 0})
  // const updateCup = update => setCup({ ...cup, ...update })
  
  const [arena, setArena] = useState({name: '', capacity: '', homeTeam: ''})
  const updateArena = update => setArena({ ...arena, ...update })

    
  const addArena = (e) => {
    e.preventDefault();
    const arenaAdded = {
      name: arena.name,
      capacity: arena.capacity,
      homeTeam: arena.homeTeam,
    };
    appendArena(arenaAdded);
    sendToDatabase(arenaAdded);
    updateArena({ name: "", capacity: "", homeTeam: "" });
  };

  useEffect(() => {
    //deleteSome()
  }, [])

  const deleteSome = async () => {
    let foundare = await Arena.find({})
    console.log("LEnGTH", foundare.length)
    await Arena.deleteMany({})
  }



  //Creates a new Arena entry and saves it to the database
  async function sendToDatabase(arenaAdded) {
    console.log(arenaAdded);
    let NewArena = new Arena({
      name: arenaAdded.name,
      capacity: arenaAdded.capacity,
      homeTeam: arenaAdded.homeTeam,
      cups: [props.cupInfo.id]
    });
    await NewArena.save();
  }

  //The form for adding the arena
  return (
    <div>
      <br />
      <Jumbotron style={{ width: '60vw', margin: 'auto', paddingTop: '40px' }} fluid>
        <h4 style={{ textAlign: 'center', marginBottom: '30px', opacity: '0.7' }}>Arena Details</h4>
        <Container fluid>
          <Form onSubmit={addArena}>
            <FormGroup>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <Input
                    type="text"
                    className="mb-3"
                    placeholder="Add arena name"
                    value={arena.name}
                    onChange={(e) => updateArena({ name: e.target.value })}
                    required
                  ></Input>
                  <Input
                    type="number"
                    className="mb-3"
                    placeholder="Add arena capacity"
                    value={arena.capacity}
                    onChange={(e) => updateArena({ capacity: e.target.value })}
                    required
                  ></Input>
                  <Input
                    type="text"
                    className="mb-3"
                    placeholder="Add arena home team"
                    value={arena.homeTeam}
                    onChange={(e) => updateArena({ homeTeam: e.target.value })}
                  ></Input>
                  <SearchAddress />
                  <Button color={colorTheme} size="lg">Add Arena</Button>
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </Container>
      </Jumbotron>
      <NewField />
      {/* <br /> */}
      {/* <ArenaList cupId={props.cupInfo.id}/> */}
    </div>
  );
}
