import React, { useContext } from 'react'
import { Card, 
  CardTitle, 
  CardText, 
  Container, 
  Row, 
  Col } from 'reactstrap';
  import { RefereeContext } from '../contexts/RefereeContextProvider'

export default function RefereeList() {
  const { referees } = useContext(RefereeContext)


  const list = () => {

    return referees.map((referee, i) => {
      return (
        <Card 
          key={referee._id + i}
          body 
          inverse 
          className="mb-2"
          style={{ 
            backgroundColor: 'gray', 
            borderColor: '#333'
          }}>
            <Container>
              <Row>
                <span style={{fontSize: '2em'}}>🍲</span>
              <Col>
                <h1>{referee.name}</h1>
                  <CardTitle>{referee.lastName}</CardTitle>
                  <CardText>{referee.firstName}</CardText>
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