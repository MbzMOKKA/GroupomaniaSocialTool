//Imports
import {
    submitSignUp,
    submitLogIn,
} from '../../utils/functions/api_communication';
import { useState } from 'react';

//Component
function SignUp({ setToken }) {
    //Preparation
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Render
    return (
        <div>
            <form>
                <input type="text" onChange={(e) => setEmail(e.target.value)} />
                <input
                    type="text"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    onClick={(e) => {
                        submitSignUp(e, setToken, { email, password });
                    }}
                >
                    CREATE ACCOUNT
                </button>
                <button
                    type="submit"
                    onClick={(e) => {
                        submitLogIn(e, setToken, { email, password });
                    }}
                >
                    CONNECT
                </button>
            </form>
        </div>
    );
}

//Exports
export default SignUp;
