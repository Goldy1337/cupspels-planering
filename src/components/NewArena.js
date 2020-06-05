import React, { useState, useContext } from 'react'
import { Button, Form, FormGroup, Input, Col, Jumbotron, Container, Row } from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
import ArenaList from './ArenaList'
import NewField from './NewField'
import FieldList from './FieldList'
import { ArenaContext } from '../contexts/ArenaContextProvider'
import { ThemeContext } from '../contexts/ThemeContextProvider';
import SearchAddress from './SearchAddress';
const {
  Arena
} = mongoosy;

export default function NewArena() {

  const { appendArena } = useContext(ArenaContext)
  const [arena, setArena] = useState({name: '', capacity: '', homeTeam: ''})
  const updateArena = update => setArena({ ...arena, ...update })
  const [colorTheme] = useContext(ThemeContext)
    
  const addArena = (e) => {
    e.preventDefault();
    const arenaAdded = {
      name: arena.name,
      capacity: arena.capacity,
      homeTeam: arena.homeTeam
    }
    appendArena(arenaAdded)
    sendToDatabase(arenaAdded)
    updateArena({ name: '', capacity: '', homeTeam: '' })
  }

  //Creates a new Arena entry and saves it to the database
  async function sendToDatabase(arenaAdded) {
    console.log(arenaAdded)
    let NewArena = new Arena({
      name: arenaAdded.name,
      capacity: arenaAdded.capacity,
      homeTeam: arenaAdded.homeTeam
    });
    await NewArena.save();
  }

  //The form for adding the arena
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <Form onSubmit={addArena}>
            <FormGroup>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <Input
                    type="text"
                    placeholder="Add arena name"
                    className="mb-3"
                    value={arena.name}
                    onChange={(e) => updateArena({ name: e.target.value })}
                    required
                  ></Input>
                  <Input
                    type="number"
                    placeholder="Add arena capacity"
                    className="mb-3"
                    value={arena.capacity}
                    onChange={(e) => updateArena({ capacity: e.target.value })}
                    required
                  ></Input>
                  <Input
                    type="text"
                    placeholder="Add arena home team"
                    className="mb-3"
                    value={arena.homeTeam}
                    onChange={(e) => updateArena({ homeTeam: e.target.value })}
                  ></Input>
                  <SearchAddress />
                  <FormGroup align="center">
                    <Button color={colorTheme} size="lg">Add Arena</Button>
                  </FormGroup>
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </Container>
      </Jumbotron>
      <ArenaList />
      <Jumbotron fluid>
        <Container fluid>
          <Form onSubmit={addArena}>
            <FormGroup>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <NewField />
                </Col>
                </Row>
              </FormGroup>
            </Form>
          </Container>
      </Jumbotron>
      <FieldList />
    </div>
  );
}