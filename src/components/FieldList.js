import React, { useContext } from 'react'
import { Table } from 'reactstrap';
import { FieldContext } from '../contexts/FieldContextProvider'

export default function FieldList() {
  const { fields } = useContext(FieldContext)

  return (
    <Table dark>  
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
          <tbody key={i}>
            <tr>
              <td>{i + 1}</td>
              <td>{field.name}</td>
              <td>{field.size}</td>
              <td>{field.surface}</td>
              <td>{field.outdoors}</td> 
            </tr>
          </tbody>
        )
        })}
      </Table>
  );
}