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
    e.preventDefault();
    const result = await communicateWithAPI('http://localhost:8000/api/auth/login', 'POST', token, {
        email,
        password,
    });
    updateToken(result.data.token);
}

export async function getAllPosts(token, posts, setPostList, addAsUnread, unread, setUnread) {
    const postLoaded = posts.length;
    const result = await communicateWithAPI(`http://localhost:8000/api/posts/${postLoaded}`, 'GET', token, null);
    if (result.status === 200) {
        if (addAsUnread === true) {
            setUnread(unread + result.data.length);
        }
        setPostList([...posts, ...result.data]);
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
            const result = await communicateWithAPI(`http://localhost:8000/api/posts/new/${lastPostLoadedId}`, 'GET', token, null);
            if (result.status === 200) {
                setUnread(unread + result.data.length);
                setPostList([...result.data, ...posts]);
            }
        }
    } catch (error) {}
}

export async function deletePost(e, token, postToDeleteId, postList, setPostList) {
    e.preventDefault();
    const result = await communicateWithAPI(`http://localhost:8000/api/posts/${postToDeleteId}`, 'DELETE', token, null);
    if (result.status === 200) {
        let newPostList = JSON.parse(JSON.stringify(postList));
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
    const result = await communicateWithAPI(`http://localhost:8000/api/posts/details/${postId}`, 'GET', token, null);
    if (result.status === 200) {
        setPostDetails(result.data);
    }
}
