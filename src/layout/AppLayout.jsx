import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AppLayout = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar expand="lg" variant='black'>
        <Container fluid>
          <Navbar.Brand href="#" className='w100' onClick={() => navigate('/')}>
            <img src='./images/logo.png' alt='' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              variant='bg-black'
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate('movies')}>Movies</Nav.Link>
              
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-danger">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  )
}

export default AppLayout
