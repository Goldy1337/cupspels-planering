import React, { useState } from 'react'
import { Button, Form, FormGroup, Input} from 'reactstrap'

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

        setName('')
        setCapacity('')
        setHomeTeam('')

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