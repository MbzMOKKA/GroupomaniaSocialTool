//Imports
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { StyledSubmitButton, StyledForm, StyledInfo } from '../style';
import InputContainer from '../../../components/common/InputContainer/index';
import ErrorMsg from '../../../components/common/ErrorMsg/index';
import { submitLogIn } from '../../../utils/api_communication/index';
import { useContext } from 'react';
import { SessionContext } from '../../../utils/context/index';

function LogIn() {
    const { token, updateToken } = useContext(SessionContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showErrorApiResponse, setShowErrorApiResponse] = useState(null);
    return (
        <main>
            {
                //Redirect to Homepage when logged in
                token !== null ? <Navigate to="/" replace={true} /> : null
            }
            <StyledForm
                className="padded-app-container"
                onSubmit={(e) => {
                    e.preventDefault();
                    submitLogIn(token, updateToken, { email, password }, setShowErrorApiResponse);
                }}
            >
                <InputContainer className="input-container">
                    <label htmlFor="login-email">E-mail</label>
                    <input
                        id="login-email"
                        className="auth-input"
                        type="email"
                        onChange={(e) => {
                            setShowErrorApiResponse(null);
                            setEmail(e.target.value);
                        }}
                    />
                </InputContainer>
                <InputContainer className="input-container">
                    <label htmlFor="login-password">Mot de passe</label>
                    <input
                        id="login-password"
                        className="auth-input"
                        type="password"
                        onChange={(e) => {
                            setShowErrorApiResponse(null);
                            setPassword(e.target.value);
                        }}
                    />
                </InputContainer>
                <div>
                    {
                        //Error showing when email or password are incorrect
                        showErrorApiResponse !== null ? <ErrorMsg>· {showErrorApiResponse} !</ErrorMsg> : null
                    }
                </div>
                <StyledSubmitButton type="submit">Se connecter</StyledSubmitButton>
            </StyledForm>
            <StyledInfo>
                <p>
                    <i className="fa-solid fa-circle-info" />
                    Pas encore de compte ?<br />
                    <Link to="/signup">Créez-en un ici !</Link>
                </p>
            </StyledInfo>
        </main>
    );
}

//Exports
export default LogIn;
