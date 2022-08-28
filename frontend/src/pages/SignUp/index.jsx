//Imports
import { submitSignUp, submitLogIn, communicateWithAPI } from '../../utils/functions/api_communication';
import { useState } from 'react';
import { useEffect } from 'react';

//Component
function SignUp({ setToken, setToday }) {
    //Preparation
    const [showUsers, setShowUsers] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUserList] = useState([]);
    useEffect(() => {
        async function getAllUsers() {
            let data = await communicateWithAPI('http://localhost:8000/api/users', 'GET', null);
            const body = await data.json();
            setUserList(body);
        }
        getAllUsers();
    }, []);

    //Render
    return (
        <div>
            <form>
                <input type="text" onChange={(e) => setEmail(e.target.value)} />
                <input type="text" onChange={(e) => setPassword(e.target.value)} />
                <button
                    type="submit"
                    onClick={(e) => {
                        submitSignUp(e, setToken, setToday, { email, password });
                    }}
                >
                    CREATE ACCOUNT
                </button>
                <button
                    type="submit"
                    onClick={(e) => {
                        submitLogIn(e, setToken, setToday, { email, password });
                    }}
                >
                    CONNECT
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setShowUsers(!showUsers);
                    }}
                >
                    {showUsers ? <p>HIDE USERS</p> : <p>SHOW USERS</p>}
                </button>
                {showUsers ? (
                    <div>
                        {users.map((user) => {
                            return (
                                <div key={user._id}>
                                    <h1>{user.email}</h1>
                                    <p>ID : {user._id}</p>
                                    <p>Role : {user.role}</p>
                                    <p>State : {user.state}</p>
                                    <button>Promote</button>
                                    <button>Restrain</button>
                                    <button>Suspend</button>
                                </div>
                            );
                        })}
                    </div>
                ) : null}
            </form>
        </div>
    );
}

//Exports
export default SignUp;
