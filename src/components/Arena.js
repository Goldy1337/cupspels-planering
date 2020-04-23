import React, { useState } from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
const {
  Arena
} = mongoosy;

export default function NewArena(){

    const [name, setName] = useState('')
    const [capacity, setCapacity] = useState('')
    const [homeTeam, setHomeTeam] = useState('')

    const addArena = (e) => {
        e.preventDefault()

        console.log({
            name,
            capacity,
            homeTeam
        })

        addArenaToDatabase({ name, capacity, homeTeam })
        
        setName('')
        setCapacity('')
        setHomeTeam('')
    }

    async function addArenaToDatabase(Input) {
        
        // Create a new arena and save to db
        let anArena = new Arena(Input);
        await anArena.save();
        // after saving the arena it has an id
        console.log('anArena', anArena.js);

        // Read that arena again from the db
        let foundArena = await Arena.findOne({ _id: anArena._id });
        console.log('foundArena', foundArena.js);

        // Read all arenas from the db
        let allArenas = await Arena.find();
        console.log('allArenas', allArenas.js);
    }

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