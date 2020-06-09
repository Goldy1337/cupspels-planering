import React, { useContext } from 'react'
import { Card,
  Container, 
  Row, 
  Col,
  Table } from 'reactstrap';
  import { RefereeContext } from '../contexts/RefereeContextProvider'

export default function RefereeList() {
  const { referees } = useContext(RefereeContext)


  const list = () => {

    // return referees.map((referee, i) => {
      return (
        <Table hover striped className="table-info">  
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Role</th>
        <th>Email</th>
        <th>Phone Number</th>
      </tr>
    </thead>
      {referees.map((referee, i) => {
        return (
          <tbody key={referee._id}>
            <tr>
              <td>{i + 1}</td>
              <td>{referee.name}</td>
              <td>{referee.role}</td>
              <td>{referee.email}</td>
              <td>{referee.phoneNumber}</td>
            </tr>
          </tbody>
        )
        })}
      </Table>
  );
      //   <Card 
      //     key={referee._id + i}
      //     body 
      //     inverse 
      //     className="mb-2 ref-list-card"
      //     style={{ 
      //       backgroundColor: 'lightgrey', 
      //       borderColor: 'grey'
      //     }}>
      //       <Container>
      //         <Row>
      //           <span role="img" aria-label="book" style={{fontSize: '2em'}}>📕</span>
      //         <Col>
      //           <h1>{referee.name}</h1>
      //           <h3>{referee.role}</h3>
      //           <div class="ref-btm-card">
      //             <h3>Mail: {referee.email}</h3>
      //             <h3>Phone: {referee.phoneNumber}</h3>
      //           </div>
      //           </Col>
      //           <span role="img"
      //           aria-label="bin"
      //             style={{cursor: 'pointer'}}
      //           >🗑️</span>
      //         </Row>
      //       </Container>
      //     </Card>
      // )
    // })
  }

  return (
    <>
      {list()}
    </>
  )
}