import React, { useState, useContext, useEffect } from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
import ArenaList from './ArenaList'
import NewField from './NewField'
import {ArenaContext} from '../contexts/ArenaContextProvider'
const {
  Arena
} = mongoosy;

export default function NewArena(props) {

  const { appendArena } = useContext(ArenaContext)

  // const [cup, setCup] = useState({name: '', id: 0})
  // const updateCup = update => setCup({ ...cup, ...update })
  
  const [arena, setArena] = useState({name: '', capacity: '', homeTeam: ''})
  const updateArena = update => setArena({ ...arena, ...update })

    
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

  useEffect(() => {
    printSome()
  }, [])

  const printSome = () => {
    
    console.log("Passed", props.cupInfo)
    console.log("Name", props.cupInfo.name)
    console.log("ID", props.cupInfo.id)
    //console.log("ID", props.cupInfo._id)
    //updateCup({name: props.cupInfo.name, id: props.cupInfo._id})
    //console.log("CUP", cup)

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
      <Form onSubmit={addArena}>
        <FormGroup>
          <Input type="text" placeholder="Add arena name" 
          value={arena.name} onChange={e => updateArena({name: e.target.value})} 
          required>
          </Input>
          <Input type="number" placeholder="Add arena capacity" 
          value={arena.capacity} onChange={e => updateArena({capacity: e.target.value})} 
          required>
          </Input>
          <Input type="text" placeholder="Add arena home team" 
          value={arena.homeTeam} onChange={e => updateArena({homeTeam: e.target.value})}>
          </Input>
          <Button>Add Arena</Button>
        </FormGroup>
      </Form>
      <ArenaList />
      <NewField />
    </div>
  )
}