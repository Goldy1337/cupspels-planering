import React, { useState } from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
const {
  Arena
} = mongoosy;

export default function NewArena(){


    const [arena, setArena] = useState({name: '', capacity: '', homeTeam: ''})

    const updateArena = update => setArena({ ...arena, ...update })

    async function addArenaToDatabase(e) {

        e.preventDefault()
        
        // Create a new arena and save to db
        let anArena = new Arena(arena);
        await anArena.save();
        // after saving the arena it has an id
        console.log('anArena', anArena.js);

        // Read that arena again from the db
        let foundArena = await Arena.findOne({ _id: anArena._id });
        console.log('foundArena', foundArena.js);

        // Read all arenas from the db
        let allArenas = await Arena.find();
        console.log('allArenas', allArenas.js);

        // This will reset the inputfields
        // when the object is submitted
        // to enhance the user experience
        updateArena({name: '', capacity: '', homeTeam: ''});
    }

    return (
        <div>
            <Form onSubmit={addArenaToDatabase}>
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
        </div>
    )

}