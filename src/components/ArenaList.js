import React, { useContext, useState, useEffect } from "react";
import { Table, Collapse } from "reactstrap";
import { ArenaContext } from "../contexts/ArenaContextProvider";
import { AddressContext } from "../contexts/AddressContextProvider";
import NewField from "./NewField";
import "../scss/style.scss";
import LeafletMap from "./LeafletMap";
import NewAddress from "./NewAddress";
import ShowAddress from "./ShowAddress";

export default function ArenaList(props) {
  const { arenas, fetchArena, fetchArenas, arena } = useContext(ArenaContext);
  const {fetchAddress} = useContext(AddressContext)
  const [isOpen, setIsOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState("")

  useEffect( () => {
     fetchArenas()
  },[])

  const toggle = (e) => {
    if( clickedRow === e.currentTarget.id) {
      setIsOpen(!isOpen);
    }
    else{
      setIsOpen(true)
    }
    setClickedRow(e.currentTarget.id)
   
    fetchArena(e.currentTarget.getAttribute('row_id'))
    fetchAddress(arena.addressId)
     
  }
  // useEffect(() => {
  //   fetchAddress(arena.addressId)
  // })
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
              <tr
                className="arena-table-row"
                row_id={arena._id}
                id={i}
                onClick={toggle}
              >
                <td>{i + 1}</td>
                <td>{arena.name}</td>
                <td>{arena.capacity}</td>
                <td>{arena.homeTeam}</td>
              </tr>
              { clickedRow == i ? (
                <Collapse isOpen={isOpen}>
                  <NewField arena={arena} />
                  <ShowAddress/>
                </Collapse>
              ) : (
                ""
              )}
            </tbody>
          );
        })}
      </Table>
    </>
  );
}
