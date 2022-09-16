//Imports
import { /*Link, */ Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../../utils/context/index';
import { getAllPosts, uploadPost } from '../../utils/api_communication/index';
import { formatDate } from '../../utils/misc/index';
import { StyleButtonUpload, StyledPostList, StyledPostCard, StyledPostHeader, StyledPostUploaderAndDate, StyledButtonPostOptions, StyledPostContent, StyledPostText, StyledPostImage, StyledPostFooter, StyledPostReaction, StyledPostEditCounter } from './style';
import { IconInButton } from '../../utils/style/GlobalStyle';

function Home() {
    const { token, accountInfo } = useContext(SessionContext);
    const [showErrorApiResponse, setShowErrorApiResponse] = useState(null);
    const [posts, setPosts] = useState([]);
    const [unread, setUnread] = useState(0);
    const [uploadContentTxt, setUploadContentTxt] = useState('');
    const [uploadContentImg, setUploadContentImg] = useState(null);
    const contentTxtLengthLimit = 1000;
    //Getting the users from the API when the page is loaded
    useEffect(() => {
        if (token !== null) {
            getAllPosts(token, posts, setPosts, false, unread, setUnread, setShowErrorApiResponse);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

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
                    return (
                        <StyledPostCard key={post._id}>
                            <StyledPostHeader>
                                <StyledPostUploaderAndDate>
                                    <h2>
                                        <i className="fa-solid fa-circle-user" />
                                        {post.uploaderId === accountInfo.userId ? <>Vous avez publié :</> : <>{post.uploaderDisplayName} à publié :</>}
                                    </h2>
                                    <p>{formatDate(post.uploadDate)}</p>
                                </StyledPostUploaderAndDate>
                                {accountInfo.role > 0 && (
                                    <StyledButtonPostOptions onClick={() => {}}>
                                        <i className="fa-solid fa-ellipsis" />
                                    </StyledButtonPostOptions>
                                )}
                            </StyledPostHeader>
                            <StyledPostContent>
                                <StyledPostText>{post.contentText}</StyledPostText>
                                {post.contentImg !== 'no_img' && <StyledPostImage src={post.contentImg} alt="" />}
                            </StyledPostContent>
                            <StyledPostFooter>
                                <StyledPostReaction>
                                    <button onClick={() => {}}>
                                        <IconInButton className="fa-regular fa-heart" />
                                        {post.likeCounter}
                                    </button>
                                    <button onClick={() => {}}>
                                        <IconInButton className="fa-regular fa-comment-dots" />
                                        {post.commentCounter}
                                    </button>
                                </StyledPostReaction>
                                {post.editCounter > 0 && <StyledPostEditCounter>Modifié</StyledPostEditCounter>}
                            </StyledPostFooter>
                        </StyledPostCard>
                    );
                })}
            </StyledPostList>
        </main>
    );
}

//Exports
export default Home;
