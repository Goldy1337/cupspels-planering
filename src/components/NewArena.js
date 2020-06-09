import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import mongoosy from "mongoosy/frontend";
import ArenaList from "./ArenaList";
import NewField from "./NewField";
import SearchAddress from "./SearchAddress";
import { GlobalContext } from "../contexts/GlobalContextProvider";
const { Arena } = mongoosy;

export default function NewArena() {
  const { appendArena } = useContext(GlobalContext);
  const [arena, setArena] = useState({ name: "", capacity: "", homeTeam: "" });
  const updateArena = (update) => setArena({ ...arena, ...update });

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

  //Creates a new Arena entry and saves it to the database
  async function sendToDatabase(arenaAdded) {
    console.log(arenaAdded);
    let NewArena = new Arena({
      name: arenaAdded.name,
      capacity: arenaAdded.capacity,
      homeTeam: arenaAdded.homeTeam,
    });
    await NewArena.save();
  }

  //The form for adding the arena
  return (
    <div>
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
      <ArenaList />
      <NewField />
    </div>
  );
}
