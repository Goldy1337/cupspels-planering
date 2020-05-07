import React, { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
        <NavbarBrand href="/" className="mr-auto loginHeaderText">reactstrap</NavbarBrand>
          <Nav navbar>
            <NavItem>
              <NavLink onClick={toggleCreateAccount}>Create Account</NavLink>
            </NavItem>
            <Modal isOpen={modalCreateAccount} toggle={modalCreateAccount} className={className}>
                <ModalHeader toggleCreateAccount={toggleCreateAccount} close={closeBtnCreateAccount}>Modal title</ModalHeader>
                <ModalBody>Account Creation coming to a popup near YOU!</ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={toggleCreateAccount}>Do Something</Button>{' '}
                  <Button color="secondary" onClick={toggleCreateAccount}>Cancel</Button>
                </ModalFooter>
              </Modal>
            <NavItem>
              <NavLink onClick={toggleLogin}>Login</NavLink>
            </NavItem>
            <Modal isOpen={modalLogin} toggle={modalLogin} className={className}>
              <ModalHeader toggleLogin={toggleLogin} close={closeBtnLogin}>Modal title</ModalHeader>
              <ModalBody>Login functionality coming to a popup near YOU!</ModalBody>
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
