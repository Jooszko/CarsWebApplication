import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import logo from './carlogo.jpg'; 
import './Styles/Header.css';


export default function NavBar() {
    return(
        <Menu inverted fixed="top">
            <Container  className="header-container">
                <Menu.Item as={NavLink} to='/cars' header>
                    <img src={logo} alt="logo" className="header-logo"/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}