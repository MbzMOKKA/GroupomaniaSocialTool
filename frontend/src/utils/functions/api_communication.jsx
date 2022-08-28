//Imports

//Exports
export async function communicateWithAPI(url, verb, body) {
    const request = {
        method: verb,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    if (body === null) {
        delete request.body;
    }
    return fetch(url, request).then((data) => data);
}

export async function submitSignUp(e, setToken, setToday, { email, password }) {
    e.preventDefault();
    const data = await communicateWithAPI('http://localhost:8000/api/auth/signup', 'POST', {
        email,
        password,
    });
    const status = data.status;
    if (status === 201) {
        //account creation success
        submitLogIn(e, setToken, setToday, { email, password });
    }
}

export async function submitLogIn(e, setToken, setToday, { email, password }) {
    e.preventDefault();
    const data = await communicateWithAPI('http://localhost:8000/api/auth/login', 'POST', {
        email,
        password,
    });
    const body = await data.json();
    setToken(body.token);
    setToday(body.test);
}
