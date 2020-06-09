import React, { useContext, useEffect } from "react";
import { Table } from "reactstrap";
import { FieldContext } from "../contexts/FieldContextProvider";

export default function FieldList(props) {
  const { arenaFields, fetchArenaFields } = useContext(FieldContext);

  useEffect(() => {
    fetchArenaFields(props.arena._Id);
  }, []);

  return (
    <Table dark className="field-list">     
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Size</th>
          <th>Surface</th>
          <th>Outdoors/Indoors</th>
        </tr>
      </thead>
      {arenaFields.map((field, i) => {
        return (
          <>
            <tbody key={i} className="field-list">
              <tr>
                <td>{i + 1}</td>
                <td>{field.name}</td>
                <td>{field.size}</td>
                <td>{field.surface}</td>
                <td>{field.outdoors}</td>
              </tr>
            </tbody>
            {/* <NewAddress address={arenaAddress} /> */}
          </>
        );
      })}
    </Table>
  );
}
