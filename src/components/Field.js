import React, { useState } from 'react'
import { Button, ButtonGroup, Form, FormGroup, Input} from 'reactstrap'

export default function NewField(){

    const [name, setName] = useState('')
    const [size, setSize] = useState('')
    const [surface, setSurface] = useState('')
    const [outdoors, setOutdoors] = useState()
    const [cSelected, setCSelected] = useState([])
    const [rSelected, setRSelected] = useState(null)

    const addField = (e) => {
        e.preventDefault()

        console.log({
            name,
            size,
            surface,
            outdoors
        })

        setName('')
        setSize('')
        setSurface('')
        setOutdoors('')

    }



  const onCheckboxBtnClick = (selected) => {
    const index = cSelected.indexOf(selected);
    if (index < 0) {
      cSelected.push(selected);
    } else {
      cSelected.splice(index, 1);
    }
    setCSelected([...cSelected]);
  }

    

    return (
        <div>
            <Form onSubmit={addField}>
                <FormGroup>
                    <Input type="text" placeholder="Add field name" 
                    value={name} onChange={e => setName(e.target.value)} 
                    required>
                    </Input>
                    <Input type="number" placeholder="Add field size" 
                    value={size} onChange={e => setSize(e.target.value)} 
                    required>
                    </Input>
                    <Input type="text" placeholder="Add field surface" 
                    value={surface} onChange={e => setSurface(e.target.value)}>
                    </Input>
                <ButtonGroup>
                        <Button color="primary" onClick={() => setRSelected(1)} active={rSelected === 1}>Outdoors</Button>
                    <Button color="primary" onClick={() => setRSelected(2)} active={rSelected === 2}>Indoors</Button>
                </ButtonGroup>
                    <Button>Add Field</Button>
                </FormGroup>
            </Form>
        </div>
    )

}