import React, { useContext, useEffect } from 'react'
import { Table } from 'reactstrap';
import { GlobalContext } from '../contexts/GlobalContextProvider';

export default function FieldList(props) {
  const { fields, fetchArenaFields } = useContext(GlobalContext)

  useEffect(() => {
    fetchArenaFields(props.arena._Id);
  }, []);

  return (
    <Table hover striped className="table-info">  
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Size</th>
        <th>Surface</th>
        <th>Outdoors/Indoors</th>
      </tr>
    </thead>
      {fields.map((field, i) => {
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
