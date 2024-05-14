import React from 'react';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap'
import { logout } from '../Redux/user/UserActions';
import SearchBox from './SearchBox';
const Header = () => {
    const userLogin = useSelector(state => state.userState)
    const dispatch = useDispatch()
    const {userInfo} = userLogin
    const logOutHandler = () => {
      dispatch(logout())
    }

    return (
        <Navbar bg="dark" expand="lg" variant='dark' collapseOnSelect>
        <Container>
        <LinkContainer to='/'>
          <Navbar.Brand >Summit</Navbar.Brand>
        </LinkContainer>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ms-auto">
            <LinkContainer to="/cart">
              <Nav.Link ><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logOutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ):
              <LinkContainer to="/login">
                  <Nav.Link><i className='fas fa-user '></i>Login</Nav.Link>
              </LinkContainer>
            }
            {
              userInfo && userInfo.isAdmin && (
                <NavDropdown title='admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/productlist'>
                      <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orderlist'>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
              </NavDropdown>
              )
            }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default Header;