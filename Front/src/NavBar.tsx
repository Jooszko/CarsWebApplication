import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from './carlogo.jpg'; 
import './Styles/Header.css';

export default function NavBar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt'); 

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        navigate('/login'); 
        window.location.reload();
    };

    return (
        <Menu inverted fixed="top">
            <Container className="header-container">
                <Menu.Item as={NavLink} to='/cars' header>
                    <img src={logo} alt="logo" className="header-logo"/>
                </Menu.Item>
                    {token && (
                        <Menu.Item className="logoutButton">
                            <Button 
                                negative 
                                content='Wyloguj' 
                                onClick={handleLogout} 
                            />
                        </Menu.Item>
                    )}
            </Container>
        </Menu>
    );
}