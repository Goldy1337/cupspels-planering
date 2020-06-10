import React, { useContext } from 'react'
import { Table } from 'reactstrap';
import { GlobalContext } from '../contexts/GlobalContextProvider';

export default function ArenaList(props) {
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
      {arenas
        .filter(function (arena) {
          if (arena.cups == undefined || arena.cups.length == 0) { return false }
          
          for (let cup of arena.cups) {
            if (cup == props.cupId) { return true }
          }
        })
        .map((arena, i) => {
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