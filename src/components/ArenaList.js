import React, { useContext } from 'react'
import { Card, 
  CardTitle, 
  CardText, 
  Container, 
  Row, 
  Col } from 'reactstrap';
  import { ArenaContext } from '../contexts/ArenaContextProvider'

export default function ArenaList() {
  const { arenas } = useContext(ArenaContext)


  const list = () => {

    return arenas.map((arena, i) => {
      return (
        <Card 
          key={arena._id + i}
          body 
          inverse 
          className="mb-2"
          style={{ 
            backgroundColor: 'green', 
            borderColor: '#333'
          }}>
            <Container>
              <Row>
                <span style={{fontSize: '2em'}}>⚽️</span>
              <Col>
                <h1>{arena.name}</h1>
                  <CardTitle>{arena.capacity}</CardTitle>
                  <CardText>{arena.homeTeam}</CardText>
                </Col>
                <span 
                  style={{cursor: 'pointer'}}
                >🗑️</span>
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