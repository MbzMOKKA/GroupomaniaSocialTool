//Imports
import axios from 'axios';

//Exports
export async function communicateWithAPI(url, verb, token, body, overwrittenConfig = null) {
    let config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (overwrittenConfig !== null) {
        config = overwrittenConfig;
    }
    config.headers.Authorization = `Bearer ${token}`;
    let method = axios.get;
    switch (verb) {
        case 'POST':
            method = axios.post;
            break;
        case 'PUT':
            method = axios.put;
            break;
        case 'DELETE':
            method = axios.delete;
            break;
        default:
            break;
    }
    if (body === null) {
        return await method(url, config);
    } else {
        return await method(url, body, config);
    }
}

export async function submitSignUp(e, token, updateToken, { email, password }) {
    e.preventDefault();
    const result = await communicateWithAPI('http://localhost:8000/api/auth/signup', 'POST', token, {
        email,
        password,
    });
    if (result.status === 201) {
        //account creation success
        submitLogIn(e, token, updateToken, { email, password });
    }
}

export async function submitLogIn(e, token, updateToken, { email, password }) {
    const result = await communicateWithAPI('http://localhost:8000/api/auth/login', 'POST', token, {
        email,
        password,
    });
    updateToken(result.data.token);
}
