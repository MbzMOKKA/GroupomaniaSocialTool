//Imports
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { StyledButtonLogIn, StyledForm, StyledNoAccountMsg } from './style';
import InputContainer from '../../components/common/InputContainer/index';
import { submitLogIn } from '../../utils/api_communication/index';
import { useContext } from 'react';
import { SessionContext } from '../../utils/context/index';

function LogIn() {
    const { token, updateToken } = useContext(SessionContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div>
            <StyledForm
                onSubmit={(e) => {
                    e.preventDefault();
                    submitLogIn(e, token, updateToken, { email, password });
                }}
            >
                <InputContainer>
                    <label htmlFor="login-email">E-mail</label>
                    <input id="login-email" className="auth-input" type="email" onChange={(e) => setEmail(e.target.value)} />
                </InputContainer>
                <InputContainer>
                    <label htmlFor="login-password">Mot de passe</label>
                    <input id="login-password" className="auth-input" type="password" onChange={(e) => setPassword(e.target.value)} />
                </InputContainer>
                <StyledButtonLogIn type="submit">Se connecter</StyledButtonLogIn>
            </StyledForm>
            <StyledNoAccountMsg>
                <p>
                    <i className="fa-solid fa-circle-info" />
                    Pas encore de compte ?<br />
                    <Link to="/signup">Créez-en un ici !</Link>
                </p>
            </StyledNoAccountMsg>
        </div>
    );
}

//Exports
export default LogIn;
