import React, { useState, createContext } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import mongoosy from 'mongoosy/frontend';
import { Redirect } from 'react-router-dom';
const {
  Login,
  User 
} = mongoosy;

export const LoginContext = createContext();

const LoginHeader = (props) => {
  const {
    className
  } = props;
  
    //The hooks used both for the login header itself and
    //for keeping track of logged in users
  const [modalCreateAccount, setModalCreateAccount] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' })
  const updateLoginCredentials = update => setLoginCredentials({...loginCredentials, ...update})

  const [loginCheck, setLoginCheck] = useState('');
  const [redirect, setRedirect] = useState(false);

  const toggleCreateAccount = () => setModalCreateAccount(!modalCreateAccount);
  const toggleLogin = () => setModalLogin(!modalLogin);

  const closeBtnCreateAccount = <button className="close" onClick={toggleCreateAccount}>&times;</button>;
  const closeBtnLogin = <button className="close" onClick={toggleLogin}>&times;</button>;

  const [loginStatus, setloginStatus] = useState({ user: null });
  const updateLoginStatus = update => setloginStatus({...loginStatus, ...update})

  //The functions used to handle logins
  if (loginStatus.user === null) {
    // we haven't checked if the user is logged in
    // yet so render nothing
    console.log('Checking login status')
    checkIfLoggedIn();
    return null;
  }

  async function checkIfLoggedIn() {
    let user = await Login.check();
    console.log(user)
    updateLoginStatus({ user: user.js.email ? user : false });
  }

  const login = async e => {
    e.preventDefault()
    // let user = await Login.login({ email, password})
    let user = await Login.login({ email: loginCredentials.email, password: loginCredentials.password });
    if (user.js.error) {
      console.log('Error')
      // setEmail('')
      // setPassword('')
    }
    else {
      updateLoginStatus({ user });
      console.log(user)
    }
  }

  return (
    <div>
      <Navbar className="loginHeader" color="info" dark>
        <NavbarBrand href="/" className="mr-auto loginHeaderText">Cupplanner</NavbarBrand>
          <Nav navbar>
            <NavItem>
              <NavLink onClick={toggleCreateAccount}>Create Account</NavLink>
            </NavItem>
            <Modal isOpen={modalCreateAccount} toggle={modalCreateAccount} className={className}>
              <ModalHeader toggleCreateAccount={toggleCreateAccount} close={closeBtnCreateAccount}>Create Account</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={2}>Email</Label>
                    <Col sm={10}>
                      <Input type="email" name="accountCreationEmail" id="accountCreationEmailId" placeholder="Example@Email.com" required/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="examplePassword" sm={2}>Password</Label>
                    <Col sm={10}>
                      <Input type="password" name="accountCreationPassword" id="accountCreationPasswordId" placeholder="Ex@mpl3~Pa$sw&rd" required/>
                    </Col>
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggleCreateAccount}>Do Something</Button>{' '}
                <Button color="secondary" onClick={toggleCreateAccount}>Cancel</Button>
              </ModalFooter>
            </Modal>
          <NavItem>
            if (user.role ==="SuperAdmin") {
              <NavLink>Logout</NavLink>
            } else {
              <NavLink onClick={toggleLogin}>Login</NavLink>
            }
            </NavItem>
            <Modal isOpen={modalLogin} toggle={modalLogin} className={className}>
              <ModalHeader toggleLogin={toggleLogin} close={closeBtnLogin}>Login</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>Email</Label>
                  <Col sm={10}>
                    <Input type="email" name="loginEmail" id="loginEmailId" placeholder="Example@Email.com"
                    value={loginCredentials.email} onChange={e => updateLoginCredentials({ email: e.target.value})}  required />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>Password</Label>
                  <Col sm={10}>
                    <Input type="text" name="loginPassword" id="loginPasswordId" placeholder="Ex@mpl3~Pa$sw&rd"
                      value={loginCredentials.password} onChange={e => updateLoginCredentials({ password: e.target.value})} required />
                  </Col>
                </FormGroup>
              </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={login}>Do Something</Button>{' '}
                <Button color="secondary" onClick={toggleLogin}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </Nav>
      </Navbar>
    </div>
  );
}

export default LoginHeader;
