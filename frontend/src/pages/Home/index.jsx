//Imports
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../../utils/context/index';
import { getAllPosts, getNewPosts, uploadPost } from '../../utils/api_communication/index';
import { StyleButtonUpload, StyledPostList } from './style';
import { IconInButton } from '../../utils/style/GlobalStyle';
import ErrorMsg from '../../components/common/ErrorMsg/index';
import Post from '../../components/post/Generic/index';

function Home() {
    const { token } = useContext(SessionContext);
    const [showErrorApiResponse, setShowErrorApiResponse] = useState(null);
    const [posts, setPosts] = useState([]);
    const [unread, setUnread] = useState(0);
    const [newCheckCounter, setNewCheckCounter] = useState(0);
    const [uploadContentTxt, setUploadContentTxt] = useState('');
    const [uploadContentImg, setUploadContentImg] = useState(null);
    const newCheckCooldown = 1000 * 5;
    const contentTxtLengthLimit = 1000;

    //Getting the users from the API when the page is loaded
    useEffect(() => {
        if (token !== null) {
            getAllPosts(token, posts, setPosts, false, unread, setUnread, setShowErrorApiResponse);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    //New post check loop
    useEffect(() => {
        let lastPostLoadedId = null;
        try {
            lastPostLoadedId = posts[0]._id;
        } catch (error) {
            lastPostLoadedId = null;
        }
        getNewPosts(token, lastPostLoadedId, posts, setPosts, unread, setUnread, setShowErrorApiResponse);
        setTimeout(() => {
            setNewCheckCounter(newCheckCounter + 1);
            if (document.hasFocus()) {
                setUnread(0);
            }
        }, newCheckCooldown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newCheckCounter]);

    //Changing the page title when new message are recieved
    /*useEffect(() => {
        let name = ``;
        if (unread > 0) {
            name = name + `(${unread}) `;
        } else {
        }
        name = name + `Groupomania`;
        document.title = name;
    }, [unread]);*/

    ////////////////////////////////////////////////////////

    function startEditPost(e, post) {
        /* e.preventDefault();
        setEditedPostObj({
            _id: post._id,
            contentTxt: post.contentText,
            contentImg: post.contentImg,
        });*/
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
        const button = document.getElementById('uploadDownload');
        if (button !== null) {
            if (newFile === null) {
                button.href = '#';
            } else {
                button.href = URL.createObjectURL(newFile);
            }
        }
    }
    function userSelectUploadImg(e) {
        setUploadContentImg(e.target.files[0]);
        if (e.target.files && e.target.files[0]) {
            formImagePreviewChange(e.target.files[0]);
        }
    }
    ////////////////////////////////////////////////////////
    return (
        <main className="padded-app-container">
            {/*
            <i className="fa-regular fa-image" />
            Ajouter une image*/}
            <h1>Dernières publications</h1>
            <StyleButtonUpload>
                <IconInButton className="fa-solid fa-pencil" />
                Créer une publication
            </StyleButtonUpload>
            {/*
                <form
                    className="uploadForm"
                    onSubmit={(e) => {
                        e.preventDefault();
                        uploadPost(token, uploadContentTxt, setUploadContentTxt, uploadContentImg, setUploadContentImg, formImagePreviewChange, setShowErrorApiResponse);
                    }}
                >
                    <label htmlFor="uploadFormTxt">Texte :</label>
                    <textarea id="uploadFormTxt" name="uploadFormTxt" maxLength={contentTxtLengthLimit} onChange={(e) => setUploadContentTxt(e.target.value)}></textarea>

                    {document.getElementById('uploadFormTxt') !== null ? (
                        <p>
                            {document.getElementById('uploadFormTxt').value.length}/{contentTxtLengthLimit}
                        </p>
                    ) : null}

                    <label htmlFor="uploadFormImg">Image :</label>
                    <input id="uploadFormImg" name="uploadFormImg" type="file" accept="image/png, image/jpg, image/jpeg, image/gif" onChange={(e) => userSelectUploadImg(e)} />
                    <img id="uploadFormImgPreview" src="#" alt="upload content" width={200} height={200} />
                    <button type="submit">Publier</button>
                </form>
                    */}
            <StyledPostList>
                {posts.map((post) => {
                    return <Post key={post._id} post={post} posts={posts} setPosts={setPosts} />;
                })}
            </StyledPostList>
            {posts.length > 0 && (
                <button
                    onClick={() => {
                        getAllPosts(token, posts, setPosts, false, null, null, setShowErrorApiResponse);
                    }}
                >
                    Voir plus
                </button>
            )}
            <div>
                {
                    //Error showing when email or password are incorrect
                    showErrorApiResponse !== null ? <ErrorMsg>· {showErrorApiResponse} !</ErrorMsg> : null
                }
            </div>
        </main>
    );
}

//Exports
export default Home;
