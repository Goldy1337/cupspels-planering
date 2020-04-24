import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import mongoosy from "mongoosy/frontend";

export default function NewTeam() {
  const [teamName, setTeamName] = useState('');
  const [teamGender, setTeamGender] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const { Team } = mongoosy;

  // Create a new admin and save to db
  async function addTeam() {
    let aTeam = new Team({
      name: teamName,
      gender: teamGender,
      age: ageGroup,
    });
    await aTeam.save();
    console.log("aTeam", aTeam.js);
  }

  // let team = {
  //   name: teamName,
  //   gender: teamGender,
  //   age: ageGroup,
  // };

  // const postTeam = async (e) => {
  //   e.preventDefault();
  //   let result = await fetch("/api/teams", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(team),
  //   });

  //   result = await result.json();
  //   //setTeam(result)
  // };

  return (
    <div>
      <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="name"
            id="teamName"
            className
            placeholder="Team name"
            autoComplete="off"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="select"
            className="teamFormInput"
            id="teamGender"
            value={teamGender}
            onChange={(e) => setTeamGender(e.target.value)}
          >
            <option>N/A</option>
            <option>Mixed</option>
            <option>Man</option>
            <option>Woman</option>
          </Input>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="age"
            id="ageGroup"
            class="teamFormInput"
            autoComplete="off"
            placeholder="Age group"
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
          />
        </FormGroup>
        <Button onClick={addTeam}>Confirm</Button>
      </Form>
    </div>
  );
}
