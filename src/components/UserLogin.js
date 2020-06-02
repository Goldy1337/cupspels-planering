import React, { useState, createContext, useContext } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Input, Label, Table } from 'reactstrap';
import mongoosy from 'mongoosy/frontend';
import { ThemeContext } from '../contexts/ThemeContextProvider';
import { LoginContext } from '../contexts/LoginContextProvider';
const {
  Login,
  User 
} = mongoosy;

export default function LoginHeader(props) {
  const {
    className
  } = props;

  const [colorTheme, setColorTheme] = useContext(ThemeContext)
  const [loginStatus, setLoginStatus, updateLoginStatus, loginCheck, setLoginCheck] = useContext(LoginContext)
  
  const [modalCreateAccount, setModalCreateAccount] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);

  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' })
  const updateLoginCredentials = update => setLoginCredentials({ ...loginCredentials, ...update })
  
  const [createMemberAccountCredentials, setCreateMemberAccountCredentials] = useState({ name: '', role: 'Member', email: '', phoneNumber: '', password: '' })
  const updateCreateMemberAccountCredentials = update => setCreateMemberAccountCredentials({ ...createMemberAccountCredentials, ...update })

  const [errorMessage, setErrorMessage] = useState('');

  const toggleCreateAccount = () => setModalCreateAccount(!modalCreateAccount);
  const toggleLogin = () => setModalLogin(!modalLogin);

  const closeBtnCreateAccount = <button className="close" onClick={toggleCreateAccount}>&times;</button>;
  const closeBtnLogin = <button className="close" onClick={toggleLogin}>&times;</button>;

  const closeLoginModal = () => {
    toggleLogin()
    updateLoginCredentials({ email: '', password: '' })
    setErrorMessage('')
  }

    const closeAccountCreationModal = () => {
    toggleCreateAccount()
    updateCreateMemberAccountCredentials({ name: '', role: 'Member', email: '', phoneNumber: '', password: '', colorMode: false })
    setErrorMessage('')
  }

  const login = async e => {
    e.preventDefault()
    let user = await Login.login({ email: loginCredentials.email, password: loginCredentials.password });
    if (user.js.error) {
      console.log(user.js.error)
      setErrorMessage(user.js.error)
      updateLoginCredentials({ email: '', password: '' })
    }
    else {
      updateLoginStatus({ user });
      closeLoginModal()
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
      password: createMemberAccountCredentials.password
    })
    await newMember.save()
    if (newMember.js.error) {
      if (newMember.js.error.code === 11000) {
        setErrorMessage('This email is alredy registered.')
      }
      else {
        setErrorMessage('An error occured.')
      }
    }
    else {
      closeAccountCreationModal()
    }
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

 function toggleColorMode() {

   document.querySelector('body').classList.toggle('darkMode', true) 
   
 }

  // function toggleColorMode() {
  //   if (colorTheme === 'info') {
  //     setColorTheme('dark');
  //   }
  //   if (colorTheme === 'dark') {
  //     setColorTheme('info')
  //   }
  // }

  return (
    <div>
      <Navbar className="loginHeader" color={colorTheme} dark>
        <NavbarBrand href="/" className="loginHeaderText">Cupplanner</NavbarBrand>
        <Nav navbar>
          {loginStatus.user ? <Button className="loginHeaderButton" color={colorTheme}>My Account</Button> : <Button className="loginHeaderButton" onClick={toggleCreateAccount} color={colorTheme}>Create Account</Button>}
          <Modal isOpen={modalCreateAccount} toggle={modalCreateAccount} className={className} color={colorTheme}>
            <ModalHeader toggleCreateAccount={toggleCreateAccount} close={closeBtnCreateAccount}>Create Account</ModalHeader>
            <ModalBody>
              <Form onSubmit={createMemberAccount}>
                <FormGroup row>
                  <Label for="exampleName" sm={2}>Name</Label>
                  <Col sm={10}>
                    <Input type="text" name="accountCreationName" id="accountCreationNameId" placeholder="Name Namingson"
                      value={createMemberAccountCredentials.name} onChange={e => updateCreateMemberAccountCredentials({ name: e.target.value })} required />
                  </Col>
                  <Label for="examplePhoneNumber" sm={2}>Phone Number</Label>
                  <Col sm={10}>
                    <Input type="numbers" name="accountCreationPhoneNumber" id="accountCreationPhoneNumberId" placeholder="0701010101"
                      value={createMemberAccountCredentials.phoneNumber} onChange={e => updateCreateMemberAccountCredentials({ phoneNumber: e.target.value })} required />
                  </Col>
                  <Label for="exampleEmail" sm={2}>Email</Label>
                  <Col sm={10}>
                    <Input type="email" name="accountCreationEmail" id="accountCreationEmailId" placeholder="Example@Email.com"
                      value={createMemberAccountCredentials.email} onChange={e => updateCreateMemberAccountCredentials({ email: e.target.value })} required />
                  </Col>
                  <Label for="examplePassword" sm={2}>Password</Label>
                  <Col sm={10}>
                    <Input type="password" name="accountCreationPassword" id="accountCreationPasswordId" placeholder="Ex@mpl3~Pa$sw&rd"
                      value={createMemberAccountCredentials.password} onChange={e => updateCreateMemberAccountCredentials({ password: e.target.value })} required />
                  <p>{errorMessage}</p>
                  </Col>
                  <Col sm={10}>
                    <Button color="primary">Create Account</Button>{' '}
                    <Button color="secondary" onClick={closeAccountCreationModal}>Cancel</Button>
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
          </Modal>
          {loginStatus.user ? <Button className="loginHeaderButton" onClick={logout} color={colorTheme}>Logout</Button> : <Button className="loginHeaderButton" onClick={toggleLogin} color={colorTheme}>Login</Button>}
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
                {errorMessage}
              </p>
              <p>
                Superadmin: god@gmail.com, 666
                Testadmin: admin@gmail.com, 100
                Testref: ref@gmail.com, 200
            </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={login}>Login</Button>{' '}
              <Button color="secondary" onClick={closeLoginModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </Nav>
      </Navbar>
      <Button onClick={deleteUsers} color={colorTheme}>Delete Users</Button>
      <br></br>
      <Button onClick={getUserData} color={colorTheme}>User Data</Button>
      <br></br>
      <Button onClick={toggleColorMode} color={colorTheme}>Change Colormode</Button>
    </div>
  );
};