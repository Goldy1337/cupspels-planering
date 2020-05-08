import React, { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Input, Label } from 'reactstrap';

const LoginHeader = (props) => {
  const {
    className
  } = props;

  const [modalCreateAccount, setModalCreateAccount] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  
  const toggleCreateAccount = () => setModalCreateAccount(!modalCreateAccount);
  const toggleLogin = () => setModalLogin(!modalLogin);

  const closeBtnCreateAccount = <button className="close" onClick={toggleCreateAccount}>&times;</button>;
  const closeBtnLogin = <button className="close" onClick={toggleLogin}>&times;</button>;

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
              <NavLink onClick={toggleLogin}>Login</NavLink>
            </NavItem>
            <Modal isOpen={modalLogin} toggle={modalLogin} className={className}>
              <ModalHeader toggleLogin={toggleLogin} close={closeBtnLogin}>Login</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>Email</Label>
                  <Col sm={10}>
                    <Input type="email" name="loginEmail" id="loginEmailId" placeholder="Example@Email.com" required/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>Password</Label>
                  <Col sm={10}>
                    <Input type="password" name="loginPassword" id="loginPasswordId" placeholder="Ex@mpl3~Pa$sw&rd" required/>
                  </Col>
                </FormGroup>
              </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggleLogin}>Do Something</Button>{' '}
                <Button color="secondary" onClick={toggleLogin}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </Nav>
      </Navbar>
    </div>
  );
}

export default LoginHeader;
