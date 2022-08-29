//Imports

//Exports
export async function communicateWithAPI(url, verb, token, body) {
    const request = {
        method: verb,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    };
    if (body === null) {
        delete request.body;
    }
    return fetch(url, request).then((data) => data);
}

export async function submitSignUp(e, token, updateToken, { email, password }) {
    e.preventDefault();
    const data = await communicateWithAPI('http://localhost:8000/api/auth/signup', 'POST', token, {
        email,
        password,
    });
    const status = data.status;
    if (status === 201) {
        //account creation success
        submitLogIn(e, token, updateToken, { email, password });
    }
}

export async function submitLogIn(e, token, updateToken, { email, password }) {
    e.preventDefault();
    const data = await communicateWithAPI('http://localhost:8000/api/auth/login', 'POST', token, {
        email,
        password,
    });
    const body = await data.json();
    updateToken(body.token);
}
