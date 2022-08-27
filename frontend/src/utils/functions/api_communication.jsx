//Imports

//Exports
export async function sendSignUp(credentials) {
    return fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    }).then((data) => data);
}

export async function submitSignUp(e, setToken, { email, password }) {
    e.preventDefault();
    const data = await sendSignUp({
        email,
        password,
    });
    const status = data.status;
    if (status === 201) {
        //account creation success
        submitLogIn(e, setToken, { email, password });
    }
}

export async function sendLogIn(credentials) {
    return fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    }).then((data) => data);
}

export async function submitLogIn(e, setToken, { email, password }) {
    e.preventDefault();
    const data = await sendLogIn({
        email,
        password,
    });
    const body = await data.json();
    setToken(body.token);
}
