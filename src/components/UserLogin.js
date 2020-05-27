import React, { useState, createContext, useContext } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import mongoosy from 'mongoosy/frontend';
import {ThemeContext} from '../contexts/ThemeContextProvider';
import { Redirect } from 'react-router-dom';
const {
  Login,
  User 
} = mongoosy;

export default function LoginHeader(props) {
  const {
    className
  } = props;

  const [colorTheme, setColorTheme] = useContext(ThemeContext)
  
  //The hooks used both for the login header itself and
  //for keeping track of logged in users
  const [modalCreateAccount, setModalCreateAccount] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);

  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' })
  const updateLoginCredentials = update => setLoginCredentials({ ...loginCredentials, ...update })
  
  const [createMemberAccountCredentials, setCreateMemberAccountCredentials] = useState({ name: '', role: 'Member', email: '', phoneNumber: '', password: '', colorMode: 'light' })
  const updateCreateMemberAccountCredentials = update => setCreateMemberAccountCredentials({ ...createMemberAccountCredentials, ...update })
  
  const [loginCheck, setLoginCheck] = useState('');

  const toggleCreateAccount = () => setModalCreateAccount(!modalCreateAccount);
  const toggleLogin = () => setModalLogin(!modalLogin);

  const closeBtnCreateAccount = <button className="close" onClick={toggleCreateAccount}>&times;</button>;
  const closeBtnLogin = <button className="close" onClick={toggleLogin}>&times;</button>;

  const [loginStatus, setloginStatus] = useState({ user: null });
  const updateLoginStatus = update => setloginStatus({ ...loginStatus, ...update });

  //The functions used to handle logins
  if (loginStatus.user === null) {
    // we haven't checked if the user is logged in
    // yet so render nothing
    console.log('Starting the checkIfLoggedIn function')
    checkIfLoggedIn();
    return null;
  }

  async function checkIfLoggedIn() {
    let user = await Login.check();
    console.log('Checking if youre logged in with the checkIfLoggedInFunction')
    console.log(user)
    updateLoginStatus({ user: user.js.email ? user : false });
    console.log(loginStatus)
  }

  const login = async e => {
    e.preventDefault()
    let user = await Login.login({ email: loginCredentials.email, password: loginCredentials.password });
    if (user.js.error) {
      console.log('Error')
      updateLoginCredentials({ email: '', password: '' })
    }
    else {
      updateLoginStatus({ user });
      console.log(user)
      toggleLogin()
      updateLoginCredentials({ email: '', password: '' })
    }
  }

  const logout = async e => {
    e.preventDefault()
    await Login.logout()
    updateLoginStatus({ user: false })
    let user = await Login.check()
    console.log(user)
  }
  
  const createMemberAccount = async e => {
    e.preventDefault()
    let newMember = new User({
      name: createMemberAccountCredentials.name,
      role: createMemberAccountCredentials.role,
      email: createMemberAccountCredentials.email,
      phoneNumber: createMemberAccountCredentials.phoneNumber,
      password: createMemberAccountCredentials.password,
      colorMode: createMemberAccountCredentials.colorMode
    })
    let users = await User.find().sort('createMemberAccountCredentials.email');
    let allUsers = await User.find();
    console.log('allUsers', allUsers.js);
    let user = await User.find({}).sort('email')
    console.log(user)
    await newMember.save()
    toggleCreateAccount()
  }

  async function deleteUsers() {
    let allUsers = await User.find();
    console.log('allUsers', allUsers.js);
    await User.deleteMany({})
    console.log('Users deleted')
  }

  async function getUserData() {
    let user = await Login.check()
    console.log(user)
  }

  async function setColorMode(userData) {
    console.log(userData)
    // let loggedInUser = await Login.check
    // console.log(loggedInUser)
    // let user = await User.find({ _id: loggedInUser._id })
    // console.log(user)
    // let newColorMode = user.colorMode
    // console.log(newColorMode)
    // Object.assign(user, { colorMode: newColorMode })
    // await user.save
  }

  function setColorModeVisitor() {
    console.log('Changing colormode for visitor')
    if (colorTheme === "light") {
      setColorTheme("dark")
    }
    if (colorTheme === "dark") {
      setColorTheme("light")
    }
  }

  //TODO Cleanup code
  return (
    <div>
      <Navbar className="loginHeader" color={loginStatus.user.colorMode === "light" || loginStatus.user === false && colorTheme === "light" ? "info" : "dark"} dark>
        <NavbarBrand href="/" className="loginHeaderText">Cupplanner</NavbarBrand>
        <Nav navbar>
          {/* <NavLink onClick={toggleCreateAccount}>Create Account</NavLink> */}
          {loginStatus.user ? <NavItem className="navLink">My Account</NavItem> : <NavItem className="navLink" onClick={toggleCreateAccount}>Create Account</NavItem>}
          <Modal isOpen={modalCreateAccount} toggle={modalCreateAccount} className={className}>
            <ModalHeader toggleCreateAccount={toggleCreateAccount} close={closeBtnCreateAccount}>Create Account</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleName" sm={2}>Name</Label>
                  <Col sm={10}>
                    <Input type="text" name="accountCreationName" id="accountCreationNameId" placeholder="Name Namingson"
                      value={createMemberAccountCredentials.name} onChange={e => updateCreateMemberAccountCredentials({ name: e.target.value })} required />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePhoneNumber" sm={2}>Phone Number</Label>
                  <Col sm={10}>
                    <Input type="numbers" name="accountCreationPhoneNumber" id="accountCreationPhoneNumberId" placeholder="0701010101"
                      value={createMemberAccountCredentials.phoneNumber} onChange={e => updateCreateMemberAccountCredentials({ phoneNumber: e.target.value })} required />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>Email</Label>
                  <Col sm={10}>
                    <Input type="email" name="accountCreationEmail" id="accountCreationEmailId" placeholder="Example@Email.com"
                      value={createMemberAccountCredentials.email} onChange={e => updateCreateMemberAccountCredentials({ email: e.target.value })} required />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>Password</Label>
                  <Col sm={10}>
                    <Input type="password" name="accountCreationPassword" id="accountCreationPasswordId" placeholder="Ex@mpl3~Pa$sw&rd"
                      value={createMemberAccountCredentials.password} onChange={e => updateCreateMemberAccountCredentials({ password: e.target.value })} required />
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={createMemberAccount}>Create Account</Button>{' '}
              <Button color="secondary" onClick={toggleCreateAccount}>Cancel</Button>
            </ModalFooter>
          </Modal>
          {loginStatus.user ? <NavItem className="navLink" onClick={logout}>Logout</NavItem> : <NavItem className="navLink" onClick={toggleLogin}>Login</NavItem>}
          <Modal isOpen={modalLogin} toggle={modalLogin} className={className}>
            <ModalHeader toggleLogin={toggleLogin} close={closeBtnLogin}>Login</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>Email</Label>
                  <Col sm={10}>
                    <Input type="email" name="loginEmail" id="loginEmailId" placeholder="Example@Email.com"
                      value={loginCredentials.email} onChange={e => updateLoginCredentials({ email: e.target.value })} required />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>Password</Label>
                  <Col sm={10}>
                    <Input type="password" name="loginPassword" id="loginPasswordId" placeholder="Ex@mpl3~Pa$sw&rd"
                      value={loginCredentials.password} onChange={e => updateLoginCredentials({ password: e.target.value })} required />
                  </Col>
                </FormGroup>
              </Form>
              <p>
                Superadmin: god@gmail.com, 666
                Testadmin: admin@gmail.com, 100
                Testref: ref@gmail.com, 200
            </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={login}>Login</Button>{' '}
              <Button color="secondary" onClick={toggleLogin}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </Nav>
      </Navbar>
      <Button onClick={deleteUsers}>Delete Users</Button>
      <br></br>
      <Button onClick={getUserData}>User Data</Button>
      <br></br>
      {loginStatus.user ? <Button onClick={() => setColorMode(loginStatus.user)}>Change Colormode for user</Button> : null}
      <br></br>
      <Button onClick={setColorModeVisitor}>Change Colormode for visitor</Button>
    </div>
  );
};