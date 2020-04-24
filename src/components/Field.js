import React, { useState } from 'react'
import { Button, ButtonGroup, Form, FormGroup, Input } from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
const {
  Field
} = mongoosy;

export default function NewField() {
  

  const [field, setField] = useState({name: '', size: '', surface: '', outdoors: true})

    const updateField = update => setField({ ...field, ...update })

    async function addFieldToDatabase(e) {

        e.preventDefault()
        
        // Create a new field and save to db
        let aField = new Field(field);
        await aField.save();
        // after saving the field it has an id
        console.log('aField', aField.js);

        // Read that field again from the db
        let foundField = await Field.findOne({ _id: aField._id });
        console.log('foundField', foundField.js);

        // Read all fields from the db
        let allFields = await Field.find();
        console.log('allFields', allFields.js);
      
        // This won't reset the choice for outdoors/indoors
        // to minimize clicking if several fields of the same
        // type is to be added
        updateField({name: '', size: '', surface: ''});
    }

    return (
        <div>
            <Form onSubmit={addFieldToDatabase}>
                <FormGroup>
                    <Input type="text" placeholder="Add field name" 
                    value={field.name} onChange={e => updateField({name: e.target.value})} 
                    required>
                    </Input>
                    <Input type="number" placeholder="Add field size" 
                    value={field.size} onChange={e => updateField({size: e.target.value})} 
                    required>
                    </Input>
                    <Input type="text" placeholder="Add field surface" 
                    value={field.surface} onChange={e => updateField({surface: e.target.value})}>
                    </Input>
                    {/* <ButtonGroup>
                        <Button color="primary" onClick={() => setRSelected(1)} active={rSelected === 1}>Outdoors</Button>
                        <Button color="primary" onClick={() => setRSelected(2)} active={rSelected === 2}>Indoors</Button>
                    </ButtonGroup> */}
                    <Button>Add Field</Button>
                </FormGroup>
            </Form>
        </div>
    )

}