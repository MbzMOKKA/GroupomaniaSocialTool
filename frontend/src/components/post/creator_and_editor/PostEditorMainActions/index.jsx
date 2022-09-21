//Imports
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SessionContext } from '../../../../utils/context/index';
import { uploadPost, savePostEdit } from '../../../../utils/api_communication/index';
import { StyledMainActionsContainer } from './style';

//Component
function PostEditorMainActions({ formContentTxt, formContentImg, postId, setShowErrorApiResponse, isModify }) {
    const { token } = useContext(SessionContext);
    const redirect = useNavigate();

    //Render
    return (
        <StyledMainActionsContainer>
            <button
                onClick={() => {
                    redirect(-1, { replace: false });
                }}
            >
                Annuler
            </button>
            <button
                onClick={() => {
                    if (isModify === true) {
                        savePostEdit(token, formContentTxt, formContentImg, postId, setShowErrorApiResponse).then((editSuccessful) => {
                            if (editSuccessful === true) {
                                redirect(-1, { replace: true });
                            }
                        });
                    } else {
                        uploadPost(token, formContentTxt, formContentImg, postId, setShowErrorApiResponse).then((uploadSuccessful) => {
                            if (uploadSuccessful === true) {
                                redirect(-1, { replace: true });
                            }
                        });
                    }
                }}
            >
                {isModify === true ? <>Appliquer</> : <>{postId === null ? <>Publier</> : <>Commenter</>}</>}
            </button>
        </StyledMainActionsContainer>
    );
}

//Exports
export default PostEditorMainActions;
