import React, { useState, useContext } from 'react'
import { Button, ButtonGroup, Form, FormGroup, Input} from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
import FieldList from './FieldList'
import { FieldContext } from '../contexts/FieldContextProvider'
import { ThemeContext } from '../contexts/ThemeContextProvider';
const {
  Field
} = mongoosy;

export default function NewField() {
  
  const { appendField } = useContext(FieldContext)
  const [field, setField] = useState({ name: '', size: '', surface: '', outdoors: 'Outdoors' })
  const updateField = update => setField({ ...field, ...update })
  // const [name, setName] = useState('')
  // const [size, setSize] = useState('')
  // const [surface, setSurface] = useState('')
  // const [outdoors, setOutdoors] = useState('Outdoors')
  const [colorTheme] = useContext(ThemeContext)

  async function addField(e) {
    e.preventDefault()
    const fieldAdded = {
      name: field.name,
      size: field.size,
      surface: field.surface,
      outdoors: field.outdoors
    }
    appendField(fieldAdded)
    sendToDatabase(fieldAdded)
    updateField({ name: '', size: '', surface: '' })
  }

  //Creates a new Field entry and adds it to the database
  async function sendToDatabase(fieldAdded) {

    let NewField = new Field({
      name: fieldAdded.name,
      size: fieldAdded.size,
      surface: fieldAdded.surface,
      outdoors: fieldAdded.outdoors
    });
    await NewField.save();
  }
  //The form for adding the field
  return (
    <div>
      <Form onSubmit={addField}>
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
          <ButtonGroup>
            <Button color={colorTheme} onClick={() => updateField({outdoors: 'Outdoors'})} active={field.outdoors === 'Outdoors'}>Outdoors</Button>
            <Button color={colorTheme} onClick={() => updateField({outdoors: 'Indoors'})} active={field.outdoors === 'Indoors'}>Indoors</Button>
          </ButtonGroup>
          <br></br>
          <Button color={colorTheme}>Add Field</Button>
        </FormGroup>
      </Form>
      <FieldList />
    </div>
  )
}