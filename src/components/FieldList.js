import React, { useContext } from 'react'
import { Card, 
  CardTitle, 
  CardText, 
  Container, 
  Row, 
  Col } from 'reactstrap';
  import { FieldContext } from '../contexts/FieldContextProvider'

export default function FieldList() {
  const { fields } = useContext(FieldContext)


  const list = () => {

    return fields.map((field, i) => {
      return (
        <Card 
          key={field._id + i}
          body 
          inverse 
          className="mb-2"
          style={{ 
            backgroundColor: 'green', 
            borderColor: '#333'
          }}>
            <Container>
              <Row>
                <span role="img" aria-label="football" style={{fontSize: '2em'}}>⚽️</span>
              <Col>
                <h1>{field.name}</h1>
                <CardTitle>{field.size}</CardTitle>
                <CardText>{field.surface}</CardText>
                <CardText>{JSON.stringify(field.outdoors)}</CardText>
              </Col>
              </Row>
            </Container>
          </Card>
      )
    })
  }

  return (
    <>
      {list()}
    </>
  )
}