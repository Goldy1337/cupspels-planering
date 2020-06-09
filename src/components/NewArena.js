import React, { useState, useContext, useEffect } from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
import ArenaList from './ArenaList'
import {ArenaContext} from '../contexts/ArenaContextProvider'
import SearchAddress from './SearchAddress';
import { AddressContext } from '../contexts/AddressContextProvider';
import NewAddress from './NewAddress';
const {
  Arena
} = mongoosy;

export default function NewArena() {

  const { appendArena, arenas } = useContext(ArenaContext)
  const { fetchAddress, address, fetchArenaAddress, arenaAddress } = useContext(AddressContext)
  const [arena, setArena] = useState({name: '', capacity: '', homeTeam: ''})
  const [hideMap, setHideMap] = useState(false);
  const [newAddress, setNewAddress] = useState(false)
  const updateArena = update => setArena({ ...arena, ...update })

    
  const addArena = async (e) => {
    e.preventDefault();
    const arenaAdded = {
      addressId: address.raw.place_id,
      name: arena.name,
      capacity: arena.capacity,
      homeTeam: arena.homeTeam
    }
    
    appendArena(arenaAdded)
    sendToDatabase(arenaAdded)
    await fetchArenaAddress(address.raw.place_id)
    updateArena({ name: '', capacity: '', homeTeam: '' })
    setNewAddress(true)
    setHideMap(true)
  }

  //Creates a new Arena entry and saves it to the database
  async function sendToDatabase(arenaAdded) {
    console.log(arenaAdded)
    let NewArena = new Arena({
      addressId: arenaAdded.addressId,
      name: arenaAdded.name,
      capacity: arenaAdded.capacity,
      homeTeam: arenaAdded.homeTeam
    });
    await NewArena.save();

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
          <SearchAddress hideMap={hideMap}/>
          <Button>Add Arena</Button>
        </FormGroup>
      </Form>
      {newAddress ? (
        <NewAddress address={address} newAddress={newAddress} />
      ): ("")}
      {address? (
      <ArenaList address={address}/>
      ):(
        <ArenaList/>
      )}
    </>
  );
}