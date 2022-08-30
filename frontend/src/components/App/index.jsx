//Imports
import { getNewPosts, getAllPosts, communicateWithAPI } from '../../utils/functions/api_communication';
import { useState } from 'react';
import SignUp from '../../pages/SignUp';
import { formatDate } from '../../utils/functions/misc';
import { useContext } from 'react';
import { TokenContext } from '../../utils/context/index';
import { useEffect } from 'react';

//Preparation

//Component
function App() {
    const { token, updateToken } = useContext(TokenContext);
    const [posts, setPostList] = useState([]);
    const [unread, setUnread] = useState(0);
    const [newCheckCounter, setNewCheckCounter] = useState(0);
    const newCheckCooldown = 1000 * 1;

    async function uploadPost(e) {
        e.preventDefault();
        const data = await communicateWithAPI(`http://localhost:8000/api/posts`, 'POST', token, null);
        const body = await data.json();
        console.log(body);
    }

    useEffect(() => {
        if (token !== null) {
            //Loading post when the user is connected
            getAllPosts(token, setPostList);
        }
    }, [token]);
    //Getting the token from the storage when loading the page
    useEffect(() => {
        const prevToken = localStorage.getItem('Token');
        if (prevToken === 'null') {
            updateToken(null);
        } else {
            updateToken(prevToken);
        }
    }, []);
    //New post check loop
    useEffect(() => {
        let lastPostLoadedId = null;
        try {
            lastPostLoadedId = posts[posts.length - 1]._id;
        } catch (error) {
            lastPostLoadedId = null;
        }
        setTimeout(() => {
            getNewPosts(token, lastPostLoadedId, posts, setPostList, unread, setUnread, newCheckCounter, setNewCheckCounter);
        }, newCheckCooldown);
    }, [newCheckCounter]);
    //Changing the page title when new message are recieved
    useEffect(() => {
        if (unread > 0) {
            document.title = `(${unread}) Groupomania`;
        } else {
            document.title = `Groupomania`;
        }
    }, [unread]);
    return (
        <div>
            <SignUp setPostList={setPostList} />
            {token === null ? null : ( //If user is connected
                <div>
                    <p>Token : {token}</p>
                    <div>
                        <h1>------------------ POSTS ------------------</h1>
                        <button
                            onClick={(e) => {
                                uploadPost(e);
                            }}
                        >
                            UPLOAD
                        </button>
                        {posts.map((post) => {
                            return (
                                <div key={post._id}>
                                    <h2>
                                        {'->'} {post.contentText}
                                    </h2>
                                    <p>ID : {post._id}</p>
                                    <p>[TEMPORARY] Index : {post.postUploadedBefore}</p>
                                    <p>UploaderId : {post.uploaderId}</p>
                                    <p>Upload date : {formatDate(post.uploadDate)}</p>
                                    <p>Edited {post.editCounter} time</p>
                                    <img src={post.contentImg} />
                                    <button
                                        onClick={(e) => {
                                            //setUserRole(e, user._id, 1);
                                        }}
                                    >
                                        LIKE ({post.likeCounter})
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            //setUserRole(e, user._id, 1);
                                        }}
                                    >
                                        OPEN COMMENTS ({post.commentCounter})
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            {localStorage.getItem('Token')}
            {/*formatDate(today)*/}
        </div>
    );
}

//Exports
export default App;
