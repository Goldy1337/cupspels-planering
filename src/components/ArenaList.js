import React, { useContext, useState } from "react";
import { Table, Collapse } from "reactstrap";
import { ArenaContext } from "../contexts/ArenaContextProvider";
import NewField from "./NewField";
import "../scss/style.scss";

export default function ArenaList() {
  const { arenas } = useContext(ArenaContext);
  const [isOpen, setIsOpen] = useState(null);
  const [clickedRow, setClickedRow] = useState("")

  const toggle = (e) => {
    if( clickedRow === e.currentTarget.id) {
      setIsOpen(!isOpen);
    }
    else{
      setIsOpen(true)
    }
    setClickedRow(e.currentTarget.id)
    console.log(e.currentTarget.id)
     
  }
  // const toggleNewField = (id) => {
  //   setShowArenaField(id);
  // };

  return (
    <>
      <Table info>
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
              <tr className="arena-table-row" id={i} onClick={toggle}>
                <td>{i + 1}</td>
                <td>{arena.name}</td>
                <td>{arena.capacity}</td>
                <td>{arena.homeTeam}</td>
              </tr>
              {
                (clickedRow == i ? (
                
                    <Collapse isOpen={isOpen}>
                      <NewField arena_id={arena._id} />
                    </Collapse>
                  
                 ) : 
               "")
              }
            </tbody>
          );
        })}
      </Table>
    </>
  );
}
