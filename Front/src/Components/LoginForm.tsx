import { useState } from "react";
import agent from "../api/agent";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import "../Styles/LoginForm.css"

export default function LoginForm() {
    const navigate = useNavigate();
    const [values, setValues] = useState({ email: '', password: '' });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const user = await agent.Account.login(values);
            localStorage.setItem('jwt', user.token); 
            localStorage.setItem('user', JSON.stringify(user)); 
            navigate('/cars'); 
            window.location.reload(); 
        } catch (error) {
            alert("Nieprawidłowy email lub hasło");
        }
    };

    return (
    <div className="register-wrapper">
        <div className="register-card">
            <h2>Logowanie</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Input 
                    type="email" 
                    placeholder="Email" 
                    value={values.email}
                    onChange={e => setValues({...values, email: e.target.value})} 
                />
                <Form.Input 
                    type="password" 
                    placeholder="Hasło" 
                    value={values.password}
                    onChange={e => setValues({...values, password: e.target.value})} 
                />
                <Button 
                    fluid 
                    className="custom-primary" 
                    type="submit" 
                    content="Zaloguj" 
                />
            </Form>
            <Button 
                fluid
                className="custom-secondary"
                type="button" 
                onClick={() => navigate('/register')}
            >
                Nie masz konta? Zarejestruj się
            </Button>
        </div>
    </div>
);
}