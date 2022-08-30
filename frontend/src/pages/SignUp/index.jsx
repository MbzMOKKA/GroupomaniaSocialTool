//Imports
import { submitSignUp, submitLogIn, communicateWithAPI } from '../../utils/functions/api_communication';
import { useState } from 'react';
//import { useEffect } from 'react';
import { useContext } from 'react';
import { TokenContext } from '../../utils/context/index';

//Component
function SignUp() {
    //Preparation
    const { token, updateToken } = useContext(TokenContext);
    const [showUsers, setShowUsers] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUserList] = useState([]);

    function showUsersToggle(e) {
        e.preventDefault();
        setShowUsers(!showUsers);
        if (showUsers === false) {
            getAllUsers();
        }
    }
    async function getAllUsers() {
        const data = await communicateWithAPI('http://localhost:8000/api/users', 'GET', token, null);
        if (data.status === 200) {
            const body = await data.json();
            setUserList(body);
        }
    }
    async function setUserRole(e, userId, newRole) {
        const element = e.currentTarget.parentElement.querySelector('.userRole');
        e.preventDefault();
        const data = await communicateWithAPI(`http://localhost:8000/api/users/role/${userId}`, 'PUT', token, { newRole });
        const status = data.status;
        const body = await data.json();
        console.log(body);
        if (status === 200) {
            element.textContent = `Role : ${newRole}`;
        }
    }
    async function setUserState(e, userId, newState) {
        const element = e.currentTarget.parentElement.querySelector('.userState');
        e.preventDefault();
        let data = await communicateWithAPI(`http://localhost:8000/api/users/state/${userId}`, 'PUT', token, { newState });
        const status = data.status;
        const body = await data.json();
        console.log(body);
        if (status === 200) {
            element.textContent = `Role : ${newState}`;
        }
    }

    //Render
    return (
        <div>
            <form>
                <input type="text" onChange={(e) => setEmail(e.target.value)} />
                <input type="text" onChange={(e) => setPassword(e.target.value)} />
                <button
                    type="submit"
                    onClick={(e) => {
                        submitSignUp(e, token, updateToken, { email, password });
                    }}
                >
                    CREATE ACCOUNT
                </button>
                <button
                    onClick={(e) => {
                        submitLogIn(e, token, updateToken, { email, password });
                    }}
                >
                    CONNECT
                </button>

                {token !== null ? (
                    <span>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                updateToken(null);
                            }}
                        >
                            DISCONNECT
                        </button>
                        <button
                            onClick={(e) => {
                                showUsersToggle(e);
                            }}
                        >
                            {showUsers ? <span>HIDE USERS</span> : <span>SHOW USERS</span>}
                        </button>
                    </span>
                ) : null}

                {showUsers ? (
                    <div>
                        <h1>------------------ USERS ------------------</h1>
                        {users.map((user) => {
                            return (
                                <div key={user._id}>
                                    <h1>{user.email}</h1>
                                    <p>ID : {user._id}</p>
                                    <p className="userRole">Role : {user.role}</p>
                                    <p className="userState">State : {user.state}</p>
                                    <button
                                        onClick={(e) => {
                                            setUserRole(e, user._id, 1);
                                        }}
                                    >
                                        ROLE (MOD)
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            setUserRole(e, user._id, 0);
                                        }}
                                    >
                                        ROLE (STAFF)
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            setUserState(e, user._id, 0);
                                        }}
                                    >
                                        STATE (ACTIVE)
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            setUserState(e, user._id, 1);
                                        }}
                                    >
                                        STATE (RESTRAINED)
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            setUserState(e, user._id, 2);
                                        }}
                                    >
                                        STATE (SUSPENDED)
                                    </button>
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
