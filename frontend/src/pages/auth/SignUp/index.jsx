//Imports
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { StyledSubmitButton, StyledForm, StyledInfo } from '../style';
import InputContainer from '../../../components/common/InputContainer/index';
import ErrorMsg from '../../../components/common/ErrorMsg/index';
import { submitSignUp } from '../../../utils/api_communication/index';
import { useContext } from 'react';
import { SessionContext } from '../../../utils/context/index';

//Component
function SignUp() {
    const { token, updateToken } = useContext(SessionContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showErrorPasswordNotSame, setShowErrorPasswordNotSame] = useState(false);
    const [showErrorApiResponse, setShowErrorApiResponse] = useState(null);

    function checkIfBothPasswordMatches() {
        if (password === passwordConfirm) {
            setShowErrorPasswordNotSame(false);
            return true;
        }
        if (passwordConfirm !== '') {
            setShowErrorPasswordNotSame(true);
        }
        return false;
    }

    //Render
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
                    if (checkIfBothPasswordMatches() === true) {
                        submitSignUp(token, updateToken, { email, password }, setShowErrorApiResponse);
                    }
                }}
            >
                <InputContainer>
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
                <InputContainer>
                    <label htmlFor="login-password">Mot de passe</label>
                    <input
                        id="login-password"
                        className="auth-input"
                        type="password"
                        onBlur={() => {
                            checkIfBothPasswordMatches();
                        }}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </InputContainer>
                <InputContainer>
                    <label htmlFor="login-password-confirm">Confirmer le mot de passe</label>
                    <input
                        id="login-password-confirm"
                        className="auth-input"
                        type="password"
                        onBlur={() => {
                            checkIfBothPasswordMatches();
                        }}
                        onChange={(e) => {
                            setPasswordConfirm(e.target.value);
                        }}
                    />
                </InputContainer>
                <div>
                    {showErrorApiResponse !== null ? <ErrorMsg>· {showErrorApiResponse} !</ErrorMsg> : null}
                    {showErrorPasswordNotSame === true ? <ErrorMsg>· La confirmation du mot de passe ne correspond pas !</ErrorMsg> : null}
                </div>
                <StyledSubmitButton type="submit">Créer un compte</StyledSubmitButton>
            </StyledForm>
            <StyledInfo>
                <p>
                    <i className="fa-solid fa-circle-info" />
                    Vous avez déjà un compte ?<br />
                    <Link to="/login">Connectez-vous ici !</Link>
                </p>
            </StyledInfo>
        </main>
    );
}

//Exports
export default SignUp;
