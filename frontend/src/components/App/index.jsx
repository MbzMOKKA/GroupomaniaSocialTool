//Imports
import { getNewPosts, getAllPosts, deletePost, likePost } from '../../utils/functions/api_communication';
import { useState } from 'react';
import SignUp from '../../pages/SignUp';
import { formatDate } from '../../utils/functions/misc';
import { useContext } from 'react';
import { TokenContext } from '../../utils/context/index';
import { useEffect } from 'react';
import PostEdit from '../PostEdit';
import PostDetails from '../../pages/PostDetails';
import axios from 'axios';

//Preparation

//Component
function App() {
    const { token, updateToken } = useContext(TokenContext);
    const [editedPostObj, setEditedPostObj] = useState(null);
    const [detailledPostId, setDetailledPostId] = useState(null);
    const [posts, setPostList] = useState([]);
    const [unread, setUnread] = useState(0);
    const [newCheckCounter, setNewCheckCounter] = useState(0);
    const [uploadContentTxt, setUploadContentTxt] = useState('');
    const [uploadContentImg, setUploadContentImg] = useState(null);
    const newCheckCooldown = 1000 * 3;
    const contentTxtLengthLimit = 1000;

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
        const data = await axios.post(url, formData, config);
        const status = data.status;
        if (status === 201) {
            //Upload successful : resetting the form
            setUploadContentTxt('');
            setUploadContentImg(null);
            document.getElementById('uploadFormTxt').value = '';
            document.getElementById('uploadFormImg').value = null;
            formImagePreviewChange(null);
        }
    }
    function startEditPost(e, post) {
        e.preventDefault();
        setEditedPostObj({
            _id: post._id,
            contentTxt: post.contentText,
            contentImg: post.contentImg,
        });
    }
    function formImagePreviewChange(newFile) {
        const img = document.getElementById('uploadFormImgPreview');
        if (img !== null) {
            if (newFile === null) {
                img.src = '#';
            } else {
                img.src = URL.createObjectURL(newFile);
            }
        }
    }
    function userSelectUploadImg(e) {
        setUploadContentImg(e.target.files[0]);
        if (e.target.files && e.target.files[0]) {
            formImagePreviewChange(e.target.files[0]);
        }
    }
    useEffect(() => {
        if (token !== null) {
            //Loading post when the user is connected
            getAllPosts(token, posts, setPostList, false, null, null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        getNewPosts(token, lastPostLoadedId, posts, setPostList, unread, setUnread);
        setTimeout(() => {
            setNewCheckCounter(newCheckCounter + 1);
            if (document.hasFocus()) {
                setUnread(0);
            }
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

    //Render
    return (
        <div>
            {editedPostObj === null ? null : <PostEdit editedPostObj={editedPostObj} setEditedPostObj={setEditedPostObj} posts={posts} setPostList={setPostList} />}
            {detailledPostId === null ? null : <PostDetails detailledPostId={detailledPostId} setDetailledPostId={setDetailledPostId} />}
            <div id="page_container">
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
                                    className="uploadForm"
                                    onSubmit={(e) => {
                                        uploadPost(e);
                                    }}
                                >
                                    <label htmlFor="uploadFormTxt">Text :</label>
                                    <textarea id="uploadFormTxt" name="uploadFormTxt" maxLength={contentTxtLengthLimit} onChange={(e) => setUploadContentTxt(e.target.value)}></textarea>

                                    {document.getElementById('uploadFormTxt') !== null ? (
                                        <p>
                                            {document.getElementById('uploadFormTxt').value.length}/{contentTxtLengthLimit}
                                        </p>
                                    ) : null}

                                    <label htmlFor="uploadFormImg">Image :</label>
                                    <input id="uploadFormImg" name="uploadFormImg" type="file" accept="image/png, image/jpg, image/jpeg, image/gif" onChange={(e) => userSelectUploadImg(e)} />
                                    <img id="uploadFormImgPreview" src="#" alt="upload content" width={200} height={200} />
                                    <button type="submit">UPLOAD</button>
                                </form>
                            </div>
                            <p>======================================</p>
                            {posts.map((post, index) => {
                                return (
                                    <div className="uploaded_post" key={post._id}>
                                        <h2>{post.uploaderDisplayName} :</h2>
                                        <p>
                                            <b>"{post.contentText}"</b>
                                        </p>
                                        {post.contentImg !== 'no_img' ? <img className="postImg" src={post.contentImg} alt="Post content" /> : null}
                                        <p> Details : </p>
                                        <p>ID : {post._id}</p>
                                        <p>UploaderId : {post.uploaderId}</p>
                                        <p>Upload date : {formatDate(post.uploadDate)}</p>
                                        <p>Edited {post.editCounter} time</p>
                                        <div>
                                            <button
                                                onClick={(e) => {
                                                    likePost(e, token, post._id, posts);
                                                }}
                                            >
                                                LIKE ({post.likeCounter})
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setDetailledPostId(post._id);
                                                }}
                                            >
                                                OPEN COMMENTS ({post.commentCounter})
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    startEditPost(e, post);
                                                }}
                                            >
                                                EDIT
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    deletePost(e, token, post._id, posts, setPostList);
                                                }}
                                            >
                                                DELETE
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                            <button
                                onClick={() => {
                                    getAllPosts(token, posts, setPostList, false, null, null);
                                }}
                            >
                                LOAD MORE
                            </button>
                        </div>
                    </div>
                )}
                {/*formatDate(today)*/}
            </div>
        </div>
    );
}

//Exports
export default App;
