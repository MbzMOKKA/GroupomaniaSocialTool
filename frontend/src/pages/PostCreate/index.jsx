//Imports
import { useState } from 'react';
import ErrorMsg from '../../components/common/ErrorMsg/index';
import MainActions from '../../components/post_editor/PostEditorMainActions/index';
import PostEditorForm from '../../components/post_editor/PostEditorForm/index';

function PostCreate({ parentPostId }) {
    const [showErrorApiResponse, setShowErrorApiResponse] = useState(null);
    const [formContentTxt, setFormContentTxt] = useState('');
    const [formContentImg, setFormContentImg] = useState('no_img');

    //Render
    return (
        <main className="padded-app-container">
            <h1>{parentPostId === null ? <>Créer une publication</> : <>Poster un commentaire</>}</h1>
            <MainActions formContentTxt={formContentTxt} formContentImg={formContentImg} postId={parentPostId} setShowErrorApiResponse={setShowErrorApiResponse} isModify={false} />
            <div>{showErrorApiResponse !== null ? <ErrorMsg>· {showErrorApiResponse} !</ErrorMsg> : null}</div>
            <PostEditorForm formContentTxt={formContentTxt} setFormContentTxt={setFormContentTxt} formContentImg={formContentImg} setFormContentImg={setFormContentImg} setShowErrorApiResponse={setShowErrorApiResponse} />
        </main>
    );
}

//Exports
export default PostCreate;
