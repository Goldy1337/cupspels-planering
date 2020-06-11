import React, { useContext, useState, useEffect } from "react";
import { Table, Collapse } from "reactstrap";
import { ArenaContext } from "../contexts/ArenaContextProvider";
import { AddressContext } from "../contexts/AddressContextProvider";
import NewField from "./NewField";
import "../scss/style.scss";
import LeafletMap from "./LeafletMap";
import NewAddress from "./NewAddress";
import ShowAddress from "./ShowAddress";
import { GlobalContext } from '../contexts/GlobalContextProvider';

export default function ArenaList(props) {
  const {
    arenas,
    fetchArena,
    fetchArenas,
    arena,
    fetchAddress,
    address,
  } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState("")

  useEffect( () => {
     fetchArenas()
  },[])

  const toggle = (e, ar) => {
    if( clickedRow === e.currentTarget.id) {
      setIsOpen(!isOpen);
    }
    else{
      setIsOpen(true)
    }
    setClickedRow(e.currentTarget.id)
   
    fetchArena(ar._id)

    fetchAddress(ar.addressId)
    console.log(ar)
    
     
  }
  useEffect(() => {
    console.log(address)
  },[arena])


  return (
    <>
      
      <Table
        style={{ width: "60vw", margin: "auto" }}
        hover
        striped
        className="table-info"
      >
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
            if (arena.cups == undefined || arena.cups.length == 0) {
              return false;
            }

            for (let cup of arena.cups) {
              if (cup == props.cupId) {
                return true;
              }
            }
          })
          .map((arena, i) => {
            return (
              <tbody key={arena._id}>
                <tr
                  className="arena-table-row"
                  id={i}
                  onClick={(e) => toggle(e, arena)}
                >
                  <td>{i + 1}</td>
                  <td>{arena.name}</td>
                  <td>{arena.capacity}</td>
                  <td>{arena.homeTeam}</td>
                </tr>
                {isOpen && clickedRow == i ? (
                  <Collapse isOpen={isOpen}>
                    <NewField arena={arena} />
                    <ShowAddress />
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
