import React, { useState, useContext } from 'react'
import { Button, ButtonGroup, Form, FormGroup, Input} from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
import FieldList from './FieldList'
import {FieldContext} from '../contexts/FieldContextProvider'
const {
  Field
} = mongoosy;

export default function NewField() {
  
  const { appendField } = useContext(FieldContext)
  const [name, setName] = useState('')
  const [size, setSize] = useState('')
  const [surface, setSurface] = useState('')
  const [outdoors, setOutdoors] = useState(true)

  async function addField(e) {
    e.preventDefault()

    const field = {
      name,
      size,
      surface,
      outdoors
    }

    appendField(field)

    sendToDatabase(field)

    setName('')
    setSize('')
    setSurface('')


  }

  //Creates a new Field entry and adds it to the database
  async function sendToDatabase(field) {

    let NewField = new Field({
      name: field.name,
      size: field.size,
      surface: field.surface,
      outdoors: field.outdoors
    });
    await NewField.save();
  }
  //The form for adding the field
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
            <Button color="primary" onClick={() =>setOutdoors(true)} active={outdoors === true}>Outdoors</Button>
            <Button color="primary" onClick={() =>setOutdoors(false)} active={outdoors === false}>Indoors</Button>
          </ButtonGroup>
          <br></br>
          <Button>Add Field</Button>
        </FormGroup>
      </Form>
      <FieldList />
    </div>
  )
}