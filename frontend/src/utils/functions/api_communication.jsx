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

export async function getAllPosts(token, posts, setPostList, addAsUnread, unread, setUnread) {
    const postLoaded = posts.length;
    const data = await communicateWithAPI(`http://localhost:8000/api/posts/${postLoaded}`, 'GET', token, null);
    if (data.status === 200) {
        const body = await data.json();
        if (addAsUnread === true) {
            setUnread(unread + body.length);
        }
        setPostList([...posts, ...body]);
    }
}
export async function getNewPosts(token, lastPostLoadedId, posts, setPostList, unread, setUnread) {
    try {
        if (token === null) {
            throw new Error('Token is null');
        }
        if (lastPostLoadedId === null) {
            //No post yet, trying to get every posts from the api
            getAllPosts(token, posts, setPostList, true, unread, setUnread);
        } else {
            //Some posts are already shown, trying to get only new post from the api
            const data = await communicateWithAPI(`http://localhost:8000/api/posts/new/${lastPostLoadedId}`, 'GET', token, null);
            if (data.status === 200) {
                const body = await data.json();
                setUnread(unread + body.length);
                setPostList([...body, ...posts]);
            }
        }
    } catch (error) {}
}

export async function deletePost(e, token, postToDeleteId, postList, setPostList) {
    e.preventDefault();
    const data = await communicateWithAPI(`http://localhost:8000/api/posts/${postToDeleteId}`, 'DELETE', token, null);
    const status = data.status;
    if (status === 200) {
        let newPostList = postList;
        for (let index in newPostList) {
            if (newPostList[index]._id === postToDeleteId) {
                newPostList.splice(index, 1);
                break;
            }
        }
        setPostList(newPostList);
    }
}
export async function likePost(e, token, postToLikeId, postList, setPostList) {
    e.preventDefault();
    let action = undefined;
    //changing the like locally
    let newPostList = JSON.parse(JSON.stringify(postList));
    for (let index in newPostList) {
        const post = newPostList[index];
        if (post._id === postToLikeId) {
            if (post.youHaveLiked === true) {
                post.likeCounter--;
            } else {
                post.likeCounter++;
            }
            post.youHaveLiked = !post.youHaveLiked;
            action = post.youHaveLiked;
            break;
        }
    }
    setPostList(newPostList);
    //sending the new desired like state to the server
    await communicateWithAPI(`http://localhost:8000/api/posts/like/${postToLikeId}`, 'POST', token, { action });
}

export async function getPostDetails(token, postId, setPostDetails) {
    const data = await communicateWithAPI(`http://localhost:8000/api/posts/details/${postId}`, 'GET', token, null);
    if (data.status === 200) {
        const body = await data.json();
        console.log(body);
        setPostDetails(body);
    }
}
