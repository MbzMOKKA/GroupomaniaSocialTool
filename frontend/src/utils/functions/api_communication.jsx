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

export async function getAllPosts(token, setPostList, addAsUnread, unread, setUnread) {
    const data = await communicateWithAPI(`http://localhost:8000/api/posts`, 'GET', token, null);
    if (data.status === 200) {
        const body = await data.json();
        if (addAsUnread === true) {
            setUnread(unread + body.length);
        }
        setPostList(body);
    }
}
export async function getNewPosts(token, lastPostLoadedId, posts, setPostList, unread, setUnread, newCheckCounter, setNewCheckCounter) {
    try {
        if (token === null) {
            throw new Error('Token is null');
        }
        if (lastPostLoadedId === null) {
            //No post yet, trying to get every posts from the api
            getAllPosts(token, setPostList, true, unread, setUnread);
        } else {
            //Some posts are already shown, trying to get only new post from the api
            const data = await communicateWithAPI(`http://localhost:8000/api/posts/new/${lastPostLoadedId}`, 'GET', token, null);
            if (data.status === 200) {
                const body = await data.json();
                setUnread(unread + body.length);
                setPostList([...body, ...posts]);
            }
        }
    } catch (error) {
    } finally {
        setNewCheckCounter(newCheckCounter + 1);
        if (document.hasFocus()) {
            setUnread(0);
        }
    }
}

export async function deletePost(e, token, postToDeleteId, postList) {
    e.preventDefault();
    const data = await communicateWithAPI(`http://localhost:8000/api/posts/${postToDeleteId}`, 'DELETE', token, null);
    const status = data.status;
    if (status === 200) {
        for (let index in postList) {
            if (postList[index]._id === postToDeleteId) {
                postList.splice(index, 1);
                break;
            }
        }
        //const body = await data.json();
    }
}
export async function likePost(e, token, postToLikeId, postList) {
    e.preventDefault();
    const data = await communicateWithAPI(`http://localhost:8000/api/posts/like/${postToLikeId}`, 'POST', token, null);
    const status = data.status;
    if (status === 200) {
        const body = await data.json();
        for (let index in postList) {
            if (postList[index]._id === postToLikeId) {
                postList[index].likeCounter = body.newLikeCounter;
                break;
            }
        }
    }
}

export async function getPostDetails(token, postId, setPostDetails) {
    const data = await communicateWithAPI(`http://localhost:8000/api/posts/${postId}`, 'GET', token, null);
    if (data.status === 200) {
        const body = await data.json();
        setPostDetails(body);
    }
}
