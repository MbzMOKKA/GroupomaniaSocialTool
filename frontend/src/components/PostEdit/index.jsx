//Imports
import { useState } from 'react';
import { useContext } from 'react';
import { TokenContext } from '../../utils/context/index';
import axios from 'axios';

//Preparation

//Component
function PostEdit({ editedPostObj, setEditedPostObj, posts, setPostList }) {
    const contentTxtLengthLimit = 1000;
    const { token /*updateToken*/ } = useContext(TokenContext);
    const [uploadContentTxt, setUploadContentTxt] = useState(editedPostObj.contentTxt);
    const [uploadContentImg, setUploadContentImg] = useState(editedPostObj.contentImg);
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
    async function savePostEdits(e) {
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
        const url = `http://localhost:8000/api/posts/${editedPostObj._id}`;
        const data = await axios.put(url, formData, config);
        const status = data.status;
        if (status === 200) {
            //Edit successful : closing the edit post component and updating the post
            const body = data.data;
            for (let index in posts) {
                if (posts[index]._id === body.returnedUpdatedPost._id) {
                    posts[index] = body.returnedUpdatedPost;
                    break;
                }
            }
            setEditedPostObj(null);
        }
        /*
        axios.put(url, formData, config).then((data) => {
            const status = data.status;
            if (status === 200) {
                //Edit successful : closing the edit post component and updating the post
                const body = await data.json();
                for (let index in posts) {
                    if (posts[index]._id === ) {
                        
                        break;
                    }
                }
                setEditedPostObj(null);
            }
        });*/
    }
    return (
        <div id="edit_post_container">
            <form
                className="editForm"
                onSubmit={(e) => {
                    savePostEdits(e);
                }}
            >
                <label htmlFor="uploadFormTxt">Text :</label>
                <textarea id="uploadFormTxt" name="uploadFormTxt" maxLength={contentTxtLengthLimit} onChange={(e) => setUploadContentTxt(e.target.value)} defaultValue={editedPostObj.contentTxt}></textarea>

                {document.getElementById('uploadFormTxt') !== null ? (
                    <p>
                        {document.getElementById('uploadFormTxt').value.length}/{contentTxtLengthLimit}
                    </p>
                ) : null}

                <label htmlFor="uploadFormImg">Image :</label>
                <input id="uploadFormImg" name="uploadFormImg" type="file" accept="image/png, image/jpg, image/jpeg, image/gif" onChange={(e) => userSelectUploadImg(e)} />
                <img id="uploadFormImgPreview" src={editedPostObj.contentImg} alt="upload content" width={200} height={200} />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setUploadContentImg('no_img');
                        formImagePreviewChange(null);
                    }}
                >
                    REMOVE IMAGE
                </button>
                <button type="submit">SAVE EDIT</button>
            </form>
        </div>
    );
}

//Exports
export default PostEdit;
