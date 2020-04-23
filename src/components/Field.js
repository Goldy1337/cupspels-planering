import React, { useState } from 'react'
import { Button, ButtonGroup, Form, FormGroup, Input } from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
const {
  Field
} = mongoosy;

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

        addFieldToDatabase({name, size, surface, outdoors})

        setName('')
        setSize('')
        setSurface('')
        setOutdoors('')

    }

    async function addFieldToDatabase(Input) {
        
        // Create a new field and save to db
        let aField = new Field(Input);
        await aField.save();
        // after saving the field it has an id
        console.log('aField', aField.js);

        // Read that field again from the db
        let foundField = await Field.findOne({ _id: aField._id });
        console.log('foundField', foundField.js);

        // Read all field from the db
        let allFields = await Field.find();
        console.log('allFields', allFields.js);
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