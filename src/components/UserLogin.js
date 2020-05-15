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
  const updateLoginCredentials = update => setLoginCredentials({ ...loginCredentials, ...update })
  
  const [createMemberAccountCredentials, setCreateMemberAccountCredentials] = useState({ name: '', role: 'Member', email: '', phoneNumber: '', password: '', salt: 'notReallyNeeded' })
  const updateCreateMemberAccountCredentials = update => setCreateMemberAccountCredentials({ ...createMemberAccountCredentials, ...update })
  
  const [loginCheck, setLoginCheck] = useState('');

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
    let user = await Login.login({ email: loginCredentials.email, password: loginCredentials.password });
    if (user.js.error) {
      console.log('Error')
      updateLoginCredentials({email: '', password: ''})
    }
    else {
      updateLoginStatus({ user });
      console.log(user)
      toggleLogin()
      updateLoginCredentials({email: '', password: ''})
    }
  }

  const logout = async e => {
    e.preventDefault()
    await Login.logout()
    updateLoginStatus({ user: false })
    let user = await Login.check()
    console.log(user)
  }
  //TODO Add checks to prohibit multiple accounts for the same email, etc
  const createMemberAccount = async e => {
    e.preventDefault()
    let newMember = new User({
      name: createMemberAccountCredentials.name,
      role: createMemberAccountCredentials.role,
      email: createMemberAccountCredentials.email,
      phoneNumber: createMemberAccountCredentials.phoneNumber,
      password: createMemberAccountCredentials.password,
      salt: createMemberAccountCredentials.salt
    })
    let user = await User.find({}).sort(createMemberAccountCredentials.email)
    console.log(user)
    if (createMemberAccountCredentials.email =! user) {
      await newMember.save()
      toggleCreateAccount()
    }
    else {
      console.log('That email is already taken')
    }
  }
  //TODO Cleanup code
  return (
    <div>
      <Navbar className="loginHeader" color="info" dark>
        <NavbarBrand href="/" className="mr-auto loginHeaderText">Cupplanner</NavbarBrand>
        <Nav navbar>
          {loginStatus.user ? <NavLink>My Account</NavLink> : <NavLink onClick={toggleCreateAccount}>Create Account</NavLink>}
          <Modal isOpen={modalCreateAccount} toggle={modalCreateAccount} className={className}>
            <ModalHeader toggleCreateAccount={toggleCreateAccount} close={closeBtnCreateAccount}>Create Account</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleName" sm={2}>Name</Label>
                    <Col sm={10}>
                  <Input type="text" name="accountCreationName" id="accountCreationNameId" placeholder="Name Namingson"
                  value={createMemberAccountCredentials.name} onChange={e => updateCreateMemberAccountCredentials({name: e.target.value})}  required />
                    </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePhoneNumber" sm={2}>Phone Number</Label>
                    <Col sm={10}>
                    <Input type="numbers" name="accountCreationPhoneNumber" id="accountCreationPhoneNumberId" placeholder="0701010101"
                    value={createMemberAccountCredentials.phoneNumber} onChange={e => updateCreateMemberAccountCredentials({phoneNumber: e.target.value})} required />
                    </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>Email</Label>
                    <Col sm={10}>
                    <Input type="email" name="accountCreationEmail" id="accountCreationEmailId" placeholder="Example@Email.com"
                    value={createMemberAccountCredentials.email} onChange={e => updateCreateMemberAccountCredentials({email: e.target.value})} required/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>Password</Label>
                  <Col sm={10}>
                    <Input type="password" name="accountCreationPassword" id="accountCreationPasswordId" placeholder="Ex@mpl3~Pa$sw&rd"
                    value={createMemberAccountCredentials.password} onChange={e => updateCreateMemberAccountCredentials({password: e.target.value})} required/>
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={createMemberAccount}>Create Account</Button>{' '}
              <Button color="secondary" onClick={toggleCreateAccount}>Cancel</Button>
            </ModalFooter>
        </Modal>
          {loginStatus.user ? <NavItem onClick={logout}>Logout</NavItem> : <NavItem onClick={toggleLogin}>Login</NavItem>}
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
                  <Input type="password" name="loginPassword" id="loginPasswordId" placeholder="Ex@mpl3~Pa$sw&rd"
                    value={loginCredentials.password} onChange={e => updateLoginCredentials({ password: e.target.value})} required />
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
    </div>
  );
}

export default LoginHeader;
