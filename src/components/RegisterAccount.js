import React, { useState, useContext } from 'react'
import { UserContext } from '../contexts/UserContextProvider'
import {withRouter} from 'react-router-dom'

const RegisterAccount = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { fetchUser } = useContext(UserContext);

  async function nodeRegister() {
    const user = fetchUser()
    const credentials = {
      username,
      password,
    };

    let response = await fetch("auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    try {
      response = await response.json();
    } catch {
      console.log("Bad credentials");
    }
  }
  return (
    <div>
      {/* <h3>Register</h3>
      <FormGroup>
        <Label for="exampleEmail">Username</Label>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          id="exampleEmail"
          placeholder="username.."
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          id="examplePassword"
          placeholder="password.."
        />
      </FormGroup>
      <Button onClick={springRegister} color="info">
        Register
      </Button> */}
    </div>
  );
};

export default withRouter(RegisterAccount);