import React, { useState } from "react";
import mongoosy from "mongoosy/frontend";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedin] = useState(false)

  const attemptLogin = async (e) => {
    const credentials = {
      email,
      password,
    };

    let response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    try {
      response = await response.json();
      console.log(response);

      //  props.history.push("/");
    } catch {
      console.log("Bad credentials");
    }
  };

  return (
    <Form>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Button className="ml-4" onClick={attemptLogin}>
          Login
        </Button>
      </FormGroup>
    </Form>
  );
}