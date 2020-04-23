import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function NewTeam() {
  const [teamName, setTeamName] = useState(null);
  const [teamGender, setTeamGender] = useState(null);
  const [ageGroup, setAgeGroup] = useState(null);
  const [team, setTeam] = useState(null)

  let team = {
    name: teamName,
    gender: teamGender,
    age: ageGroup,
  };

  const postTeam = async (e) => {
    e.preventDefault();
    let result = await fetch("/api/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(team),
    });

    result = await result.json();
    setTeam(result)
  };

  return (
    <div>
      <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="name"
            id="teamName"
            placeholder="Lagnamn"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="select"
            id="teamGender"
            value={teamGender}
            onChange={(e) => setTeamGender(e.target.value)}
          >
            <option>Alla</option>
            <option>Man</option>
            <option>Kvinna</option>
          </Input>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="age"
            id="ageGroup"
            placeholder="Åldersgrupp"
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
          />
        </FormGroup>
        <Button onClick={postTeam()}>Bekräfta</Button>
      </Form>
    </div>
  );
}
