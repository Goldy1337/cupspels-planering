import React, { useState, useContext } from 'react'
import { Button, ButtonGroup, Form, FormGroup, Input, Jumbotron, Col, Row, Container } from 'reactstrap'
import mongoosy from 'mongoosy/frontend';
import FieldList from './FieldList'
import { GlobalContext } from '../contexts/GlobalContextProvider';
const {
  Field
} = mongoosy;

export default function NewField() {
  
  const { appendField, colorTheme } = useContext(GlobalContext)
  const [field, setField] = useState({ name: '', size: '', surface: '', outdoors: 'Outdoors' })
  const updateField = update => setField({ ...field, ...update })
  // const [name, setName] = useState('')
  // const [size, setSize] = useState('')
  // const [surface, setSurface] = useState('')
  // const [outdoors, setOutdoors] = useState('Outdoors')

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
      <br />
      <Jumbotron style={{ width: '60vw', margin: 'auto', paddingTop: '40px' }} fluid>
        <h4 style={{ textAlign: 'center', marginBottom: '30px', opacity: '0.7' }}>Field Details</h4>
        <Container fluid>
          <Form onSubmit={addField}>
            <FormGroup>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <Input
                    type="text"
                    placeholder="Add field name"
                    value={field.name}
                    onChange={e => updateField({ name: e.target.value })}
                    className="mb-3"
                    required>
                  </Input>
                  <Input
                    type="number"
                    placeholder="Add field size" 
                    value={field.size}
                    onChange={e => updateField({ size: e.target.value })}
                    className="mb-3"
                    required>
                  </Input>
                  <Input
                    type="text"
                    placeholder="Add field surface" 
                    value={field.surface}
                    onChange={e => updateField({ surface: e.target.value })}
                    className="mb-3">
                  </Input>
                  <ButtonGroup>
                    <Button color={colorTheme} className="mb-3" onClick={() => updateField({outdoors: 'Outdoors'})} active={field.outdoors === 'Outdoors'}>Outdoors</Button>
                    <Button color={colorTheme} className="mb-3" onClick={() => updateField({outdoors: 'Indoors'})} active={field.outdoors === 'Indoors'}>Indoors</Button>
                  </ButtonGroup>
                  <br></br>
                  <Button color={colorTheme} size="lg" className="mb-3">Add Field</Button>
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </Container>
      </Jumbotron>
    </div>
  )
}