//Imports
import { useEffect } from 'react';
import { useState } from 'react';
import { getPostDetails } from '../../utils/functions/api_communication';
import { useContext } from 'react';
import { TokenContext } from '../../utils/context/index';
import { formatDate } from '../../utils/functions/misc';
import axios from 'axios';

//Component
function PostDetails({ detailledPostId, setDetailledPostId }) {
    //Preparation
    const { token, updateToken } = useContext(TokenContext);
    const [postDetails, setPostDetails] = useState({});
    useEffect(() => {
        getPostDetails(token, detailledPostId, setPostDetails);
    }, []);
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
                <p>ID : {postDetails._id}</p>
                <p>UploaderId : {postDetails.uploaderId}</p>
                <p>Upload date : {formatDate(postDetails.uploadDate)}</p>
                <p>Edited {postDetails.editCounter} time</p>
                <div className="post_comments">
                    <h3>Comments :</h3>
                </div>
            </div>
        </div>
    );
}

//Exports
export default PostDetails;
