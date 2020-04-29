import React, { useState, useContext } from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
import {ArenaContext} from '../contexts/ArenaContextProvider'
const {
  Arena
} = mongoosy;

export default function NewArena() {

  const { appendArena } = useContext(ArenaContext)
  const [name, setName] = useState('')
  const [capacity, setCapacity] = useState('')
  const [homeTeam, setHomeTeam] = useState('')
    
  const addArena = (e) => {
    e.preventDefault();

    const arena = {
      name,
      capacity,
      homeTeam
    }

    appendArena(arena)

    sendToDatabase(arena)

    setName('')
    setCapacity('')
    setHomeTeam('')
  }

  //Creates a new Arena entry and saves it to the database
  async function sendToDatabase(arena) {

    let NewArena = new Arena({
      name: arena.name,
      capacity: arena.capacity,
      homeTeam: arena.homeTeam
    });
    
    await NewArena.save();
  }

  //The form for adding the arena
  return (
    <div>
      <Form onSubmit={addArena}>
        <FormGroup>
          <Input type="text" placeholder="Add arena name" 
          value={name} onChange={e => setName(e.target.value)} 
          required>
          </Input>
          <Input type="number" placeholder="Add arena capacity" 
          value={capacity} onChange={e => setCapacity(e.target.value)} 
          required>
          </Input>
          <Input type="text" placeholder="Add arena home team" 
          value={homeTeam} onChange={e => setHomeTeam(e.target.value)}>
          </Input>
          <Button>Add Arena</Button>
        </FormGroup>
      </Form>
    </div>
  )
}