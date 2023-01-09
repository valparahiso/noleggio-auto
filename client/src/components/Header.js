import React from 'react'
import logo from '../img/logoNoleggio.png';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {NavLink} from 'react-router-dom'
import Image from 'react-bootstrap/Image' 
import Button from 'react-bootstrap/Button';


const Header = (props)=>{
    return(

      <Navbar className="background-std" collapseOnSelect expand="lg" variant="dark">
        <Nav className="m-auto">
          <Navbar.Brand> 
                  <Image src={logo} width="80%" height="100%"/>
          </Navbar.Brand>
        </Nav>

  {(props.show) ? (
  <>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="m-auto navFont">
      <NavLink to="/configurazione" className="navlinkStyle">Noleggia Ora</NavLink>
      <h4 className="h4Margin">|</h4>
      <NavLink to="/prenotazioni" className="navlinkStyle">Le Mie Prenotazioni</NavLink>
      <h4 className="h4Margin">|</h4>
      <NavLink to="/storico" className="navlinkStyle">Storico</NavLink>   
    </Nav>
    <Nav>
      <Button variant="secondary" onClick={()=>{props.onClick()}}>Logout</Button>
    </Nav>
  </Navbar.Collapse>
  </>
  ) : (<React.Fragment></React.Fragment>)} 
  </Navbar>

  );
} 


export default Header;