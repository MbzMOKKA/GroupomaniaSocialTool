//Imports
import { submitSignUp, submitLogIn, communicateWithAPI } from '../../utils/functions/api_communication';
import { useState } from 'react';
import { useEffect } from 'react';
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

    async function getAllUsers() {
        let data = await communicateWithAPI('http://localhost:8000/api/users', 'GET', token, null);
        const body = await data.json();
        setUserList(body);
    }
    async function setUserRole(userId, newRole) {
        //console.log(userId);
        let data = await communicateWithAPI(`http://localhost:8000/api/users/role/${userId}`, 'PUT', token, { newRole });
        const body = await data.json();
        console.log(body);
        //setUserList(body);
    }

    //When page loaded
    useEffect(() => {
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
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setShowUsers(!showUsers);
                    }}
                >
                    {showUsers ? <span>HIDE USERS</span> : <span>SHOW USERS</span>}
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
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setUserRole(user._id, 1);
                                        }}
                                    >
                                        ROLE (MOD)
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setUserRole(user._id, 0);
                                        }}
                                    >
                                        ROLE (STAFF)
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            //submitLogIn(e, setToken, setToday, { email, password });
                                        }}
                                    >
                                        STATE (RESTRAINED)
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            //submitLogIn(e, setToken, setToday, { email, password });
                                        }}
                                    >
                                        STATE (SUSPENDED)
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            //submitLogIn(e, setToken, setToday, { email, password });
                                        }}
                                    >
                                        STATE (ACTIVE)
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
