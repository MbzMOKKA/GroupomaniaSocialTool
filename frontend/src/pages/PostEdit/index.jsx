//Imports
import { useContext, useState, useEffect } from 'react';
import { SessionContext } from '../../utils/context/index';
import { getPostDetails } from '../../utils/api_communication/index';
import { useParams } from 'react-router-dom';
import ErrorMsg from '../../components/common/ErrorMsg/index';
import MainActions from '../../components/post/creator_and_editor/PostEditorMainActions/index';
import PostEditorForm from '../../components/post/creator_and_editor/PostEditorForm/index';

function PostEdit() {
    const { token } = useContext(SessionContext);
    const { postId } = useParams();
    const [showErrorApiResponse, setShowErrorApiResponse] = useState(null);
    const [post, setPost] = useState({});
    const [formContentTxt, setFormContentTxt] = useState('');
    const [formContentImg, setFormContentImg] = useState('no_img');

    //Getting the post details from the API when the page is loaded
    useEffect(() => {
        if (token !== null) {
            getPostDetails(token, postId, setPost, setShowErrorApiResponse);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, postId]);

    //Setting the default value of the inputs to match the current content of the post
    useEffect(() => {
        if (post.contentText) {
            setFormContentTxt(post.contentText);
            setFormContentImg(post.contentImg);
            document.getElementById('postFormTxt').value = post.contentText;
            document.getElementById('postFormImgPreview').src = post.contentImg;
        }
    }, [post]);

    //Render
    return (
        <main className="padded-app-container">
            <h1>Modifier le post</h1>
            <MainActions formContentTxt={formContentTxt} formContentImg={formContentImg} postId={post._id} setShowErrorApiResponse={setShowErrorApiResponse} isModify={true} />
            <div>{showErrorApiResponse !== null ? <ErrorMsg>· {showErrorApiResponse} !</ErrorMsg> : null}</div>
            <PostEditorForm formContentTxt={formContentTxt} setFormContentTxt={setFormContentTxt} formContentImg={formContentImg} setFormContentImg={setFormContentImg} setShowErrorApiResponse={setShowErrorApiResponse} />
        </main>
    );
}

//Exports
export default PostEdit;
