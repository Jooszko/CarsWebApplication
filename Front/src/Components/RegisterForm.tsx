import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Header } from 'semantic-ui-react';
import '../Styles/RegisterForm.css';

export default function RegisterForm() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        displayName: '',
        userName: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await axios.post("https://localhost:7050/api/account/register", {
            ...values,
            bio: "" 
        });
        
        localStorage.setItem('jwt', response.data.token);
        alert("Rejestracja udana!");
        navigate('/cars');
    } catch (error: any) {
        console.log(error.response?.data);
        const errorDetails = error.response?.data;
        
        alert("Błędne dane");
    }

};

    return (
    <div className="register-wrapper">
        <Container className="register-card">
            <Header className="headerH2" as='h2' content='Załóż konto' />
            
            <Form onSubmit={handleSubmit} size="large">
                <Form.Input 
                    label='Imię i nazwisko' 
                    placeholder='Jan Kowalski' 
                    name='displayName'
                    onChange={e => setValues({...values, displayName: e.target.value})} 
                />
                <Form.Input 
                    label='Nazwa użytkownika' 
                    placeholder='Username' 
                    name='userName'
                    onChange={e => setValues({...values, userName: e.target.value})} 
                />
                <Form.Input 
                    label='Email' 
                    type='email' 
                    placeholder='email@test.com' 
                    name='email'
                    onChange={e => setValues({...values, email: e.target.value})} 
                />
                <Form.Input 
                    label='Hasło' 
                    type='password' 
                    placeholder='4-8 znaków, duża litera, cyfra' 
                    name='password'
                    onChange={e => setValues({...values, password: e.target.value})} 
                />
                
                <Button 
                    fluid 
                    className="custom-primary" 
                    type='submit' 
                    content='Zarejestruj się' 
                />
            </Form>

            <Button 
                fluid 
                className="custom-secondary"
                type="button" 
                onClick={() => navigate('/login')}
            >
                Masz już konto? Zaloguj się
            </Button>
        </Container>
    </div>
);
}