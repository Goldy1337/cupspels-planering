import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const LoginHeader = (props) => {

  return (
    <div>
      <Navbar className="loginHeader" color="info" dark>
        <NavbarBrand href="/" className="mr-auto loginHeaderText">reactstrap</NavbarBrand>
          <Nav navbar>
            <NavItem>
              <NavLink href="/components/">Create Account</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">Login</NavLink>
            </NavItem>
          </Nav>
      </Navbar>
    </div>
  );
}

export default LoginHeader;
