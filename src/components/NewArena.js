import React, { useState, useContext, useEffect } from 'react'
import { Button, Form, FormGroup, Input, Jumbotron, Label } from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
import SearchAddress from "./SearchAddress";
import ArenaList from './ArenaList'
import NewField from './NewField'
import { GlobalContext } from "../contexts/GlobalContextProvider";
const { Arena } = mongoosy;

export default function NewArena(props) {
  const { appendArena, colorTheme, arenaAddress, fetchArena } = useContext(GlobalContext);

  // const { appendArena, fetchArena } = useContext(ArenaContext)
  // const { arenaAddress } = useContext(AddressContext)
  const [arena, setArena] = useState({name: '', capacity: '', homeTeam: ''})
  const updateArena = update => setArena({ ...arena, ...update })

    
  const addArena = async (e) => {
    e.preventDefault();
    const arenaAdded = {
      addressId: arenaAddress._id,
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
    console.log(arenaAdded)
    let newArena = new Arena({
      addressId: arenaAdded.addressId,
      name: arenaAdded.name,
      capacity: arenaAdded.capacity,
      homeTeam: arenaAdded.homeTeam,
      //cups: [props.cupInfo.id]
    });
    await newArena.save();

    console.log(newArena)
    fetchArena(newArena)

  }

  //The form for adding the arena
  return (
    <div>
      <br />
      <Jumbotron style={{ width: '60vw', margin: 'auto', paddingTop: '40px' }} fluid>
      <h4 style={{textAlign: 'center', marginBottom: '30px', opacity: '0.7'}}>Arena Details</h4>
      <Form style={{padding: '0px 50px', width: '40vw'}} onSubmit={addArena}>
          <FormGroup style={{}}>
            <Input
              style={{width: '40vw'}}
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
      </Jumbotron>
      <br />
      {props.cupInfo ?
      (<ArenaList cupId={props.cupInfo.id}/>)
      : (<ArenaList/>)}
    </div>
  );
}
