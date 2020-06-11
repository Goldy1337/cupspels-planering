import React, { useState, useContext, useEffect } from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
import ArenaList from './ArenaList'
import {ArenaContext} from '../contexts/ArenaContextProvider'
import SearchAddress from './SearchAddress';
import { AddressContext } from '../contexts/AddressContextProvider';
const {
  Arena
} = mongoosy;

export default function NewArena() {

  const { appendArena, fetchArena } = useContext(ArenaContext)
  const { arenaAddress } = useContext(AddressContext)
  const [arena, setArena] = useState({name: '', capacity: '', homeTeam: ''})
  const updateArena = update => setArena({ ...arena, ...update })

    
  const addArena = async (e) => {
    e.preventDefault();
    const arenaAdded = {
      addressId: arenaAddress._id,
      name: arena.name,
      capacity: arena.capacity,
      homeTeam: arena.homeTeam
    }
    
    appendArena(arenaAdded)
    sendToDatabase(arenaAdded)
    console.log(arenaAddress)
    // await fetchArenaAddress(address._id)
    updateArena({ name: '', capacity: '', homeTeam: '' })
  }

  //Creates a new Arena entry and saves it to the database
  async function sendToDatabase(arenaAdded) {
    console.log(arenaAdded)
    let newArena = new Arena({
      addressId: arenaAdded.addressId,
      name: arenaAdded.name,
      capacity: arenaAdded.capacity,
      homeTeam: arenaAdded.homeTeam
    });
    await newArena.save();

    console.log(newArena)
    fetchArena(newArena)

  }

  //The form for adding the arena
  return (
    <>
      <Form onSubmit={addArena}>
        <FormGroup>
          <Input
            type="text"
            placeholder="Add arena name"
            value={arena.name}
            onChange={(e) => updateArena({ name: e.target.value })}
            required
          ></Input>
          <Input
            type="number"
            placeholder="Add arena capacity"
            value={arena.capacity}
            onChange={(e) => updateArena({ capacity: e.target.value })}
            required
          ></Input>
          <Input
            type="text"
            placeholder="Add arena home team"
            value={arena.homeTeam}
            onChange={(e) => updateArena({ homeTeam: e.target.value })}
          ></Input>
          <SearchAddress />
          <Button>Add Arena</Button>
        </FormGroup>
      </Form>
        <ArenaList/>

    </>
  );
}