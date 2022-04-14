import React, { Fragment } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Outlet } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../action/user";

const Navigation = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logout_controller = () => {
    if (userInfo) {
      dispatch(logout());
    }
  };
  return (
    <Fragment>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Auction</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Explore</Nav.Link>
              {userInfo ? <Nav.Link href="/auction/new">New Auction</Nav.Link> : ""}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            {userInfo ? (
              <Navbar.Text>
                <a className="btn" onClick={logout_controller}>Logout</a>
              </Navbar.Text>
            ) : (
              <Navbar.Text>
                <a href="/login" className="btn">Login</a>
              </Navbar.Text>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
