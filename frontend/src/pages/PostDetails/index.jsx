//Imports
import { useEffect } from 'react';
import { useState } from 'react';
import { getPostDetails, communicateWithAPI } from '../../utils/functions/api_communication';
import { useContext } from 'react';
import { TokenContext } from '../../utils/context/index';
import { formatDate } from '../../utils/functions/misc';
import axios from 'axios';

//Component
function PostDetails({ detailledPostId, setDetailledPostId }) {
    //Preparation
    const { token /*, updateToken*/ } = useContext(TokenContext);
    const [postDetails, setPostDetails] = useState({});
    useEffect(() => {
        getPostDetails(token, detailledPostId, setPostDetails);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    async function uploadComment(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('uploadFormTxt', 'Test comment');
        formData.append('uploadFormImg', 'no_img');
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        const result = await communicateWithAPI(`http://localhost:8000/api/posts/${detailledPostId}`, 'POST', token, formData, config);
        if (result.status === 201) {
            //Upload successful : adding your comment to the list displayed
            let comments = postDetails.comments;
            comments.push(result.data.returnedUploadedComment);
            setPostDetails({ ...postDetails, comments });
        }
    }
    //Render
    return (
        <div id="post_details_container">
            <div id="post_details">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setDetailledPostId(null);
                    }}
                >
                    CLOSE
                </button>
                <h2>{postDetails.uploaderDisplayName} has published :</h2>
                <blockquote>{postDetails.contentText}</blockquote>
                {postDetails.contentImg !== 'no_img' ? <img className="postImg" src={postDetails.contentImg} alt="Post content" /> : null}
                <h3> Details :</h3>
                {/*<p>ID : {postDetails._id}</p>
                <p>UploaderId : {postDetails.uploaderId}</p>*/}
                <p>Upload date : {formatDate(postDetails.uploadDate)}</p>
                <p>Edited {postDetails.editCounter} time</p>
                <div className="post_comments">
                    <h3>Comments :</h3>
                    <button
                        onClick={(e) => {
                            uploadComment(e);
                        }}
                    >
                        COMMENT
                    </button>
                    <div>
                        {postDetails.comments &&
                            postDetails.comments.map((post, index) => {
                                return (
                                    <div className="uploaded_post" key={post._id}>
                                        <h2>{post.uploaderDisplayName} has commented :</h2>
                                        <b>"{post.contentText}"</b>
                                        {post.contentImg !== 'no_img' ? <img className="postImg" src={post.contentImg} alt="Post content" /> : null}
                                        {/*<p>ID : {post._id}</p>
                                        <p>UploaderId : {post.uploaderId}</p>*/}
                                        <p>Upload date : {formatDate(post.uploadDate)}</p>
                                        <p>Edited {post.editCounter} time</p>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
}

//Exports
export default PostDetails;
