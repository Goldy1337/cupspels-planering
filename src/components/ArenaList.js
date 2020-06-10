import React, { useContext } from 'react'
import { Table } from 'reactstrap';
import { GlobalContext } from '../contexts/GlobalContextProvider';

export default function ArenaList() {
  const { arenas } = useContext(GlobalContext)

  return (
    <Table hover striped className="table-info">  
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Capacity</th>
        <th>Home Team</th>
      </tr>
    </thead>
      {arenas.map((arena, i) => {
        return (
          <tbody key={arena._id}>
            <tr>
              <td>{i + 1}</td>
              <td>{arena.name}</td>
              <td>{arena.capacity}</td>
              <td>{arena.homeTeam}</td>
            </tr>
          </tbody>
        )
        })}
      </Table>
  );
}