//Imports
import { getNewPosts, getAllPosts } from '../../utils/functions/api_communication';
import { useState } from 'react';
import SignUp from '../../pages/SignUp';
import { formatDate } from '../../utils/functions/misc';
import { useContext } from 'react';
import { TokenContext } from '../../utils/context/index';
import { useEffect } from 'react';
import axios from 'axios';

//Preparation

//Component
function App() {
    const { token, updateToken } = useContext(TokenContext);
    const [posts, setPostList] = useState([]);
    const [unread, setUnread] = useState(0);
    const [newCheckCounter, setNewCheckCounter] = useState(0);
    const [uploadContentTxt, setUploadContentTxt] = useState('');
    const [uploadContentImg, setUploadContentImg] = useState(null);
    const newCheckCooldown = 1000 * 3;

    async function uploadPost(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('uploadFormTxt', uploadContentTxt);
        formData.append('uploadFormImg', uploadContentImg);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        };
        const url = `http://localhost:8000/api/posts`;
        axios.post(url, formData, config).then((data) => {
            data.json().then((body) => {
                console.log(body);
            });
        });
    }

    function userSelectUploadImg(e) {
        setUploadContentImg(e.target.files[0]);
        if (e.target.files && e.target.files[0]) {
            const img = document.getElementById('uploadFormImgPreview');
            img.src = URL.createObjectURL(e.target.files[0]); // set src to blob url
        }
    }
    useEffect(() => {
        if (token !== null) {
            //Loading post when the user is connected
            getAllPosts(token, setPostList, false, null, null);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //New post check loop
    useEffect(() => {
        let lastPostLoadedId = null;
        try {
            lastPostLoadedId = posts[0]._id;
        } catch (error) {
            lastPostLoadedId = null;
        }
        setTimeout(() => {
            getNewPosts(token, lastPostLoadedId, posts, setPostList, unread, setUnread, newCheckCounter, setNewCheckCounter);
        }, newCheckCooldown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newCheckCounter]);

    //Changing the page title when new message are recieved
    useEffect(() => {
        let name = ``;
        if (unread > 0) {
            name = name + `(${unread}) `;
        } else {
        }
        name = name + `Groupomania`;
        document.title = name;
    }, [unread]);

    return (
        <div>
            <SignUp setPostList={setPostList} />
            {token === null ? null : ( //If user is connected
                <div>
                    <div id="token_display">
                        <p>Token : {token}</p>
                        <p>LocalStorage token : {localStorage.getItem('Token')}</p>
                    </div>

                    <div>
                        <h1>------------------ POSTS ------------------</h1>
                        <div>
                            <form
                                id="uploadForm"
                                name="uploadForm"
                                onSubmit={(e) => {
                                    uploadPost(e);
                                }}
                            >
                                <label htmlFor="uploadFormTxt">Text :</label>
                                <textarea id="uploadFormTxt" name="uploadFormTxt" maxLength={1000} onChange={(e) => setUploadContentTxt(e.target.value)}></textarea>
                                <label htmlFor="uploadFormImg">Image :</label>
                                <input id="uploadFormImg" name="uploadFormImg" type="file" accept="image/png, image/jpg, image/jpeg, image/gif" onChange={(e) => userSelectUploadImg(e)} />
                                <img id="uploadFormImgPreview" src="#" alt="upload content" width={100} height={100} />
                                <button type="submit">UPLOAD</button>
                            </form>
                        </div>
                        <p>======================================</p>
                        {posts.map((post) => {
                            return (
                                <div key={post._id}>
                                    <h2>ID : {post._id}</h2>
                                    <p>{post.contentText}</p>
                                    <p> ### </p>
                                    <p>[TEMPORARY] Index : {post.postUploadedBefore}</p>
                                    <p>UploaderId : {post.uploaderId}</p>
                                    <p>Upload date : {formatDate(post.uploadDate)}</p>
                                    <p>Edited {post.editCounter} time</p>
                                    <img className="postImg" src={post.contentImg} alt="Post content" />
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
            {/*formatDate(today)*/}
        </div>
    );
}

//Exports
export default App;
