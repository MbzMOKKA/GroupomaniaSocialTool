//Imports
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { SessionContext } from '../../utils/context/index';
import { uploadPost } from '../../utils/api_communication/index';
import { StyledSendOrCancelContainer, StyledForm, StyledLabel, StyledInputInfo, StyledInputText, StyledInputImage, StyledAddImageArea, StyleImageManageContainer, StyledImagePreview } from './style';
//import { IconInButton } from '../../utils/style/GlobalStyle';
import ErrorMsg from '../../components/common/ErrorMsg/index';

function PostCreate({ parentPostId }) {
    const { token } = useContext(SessionContext);
    const [showErrorApiResponse, setShowErrorApiResponse] = useState(null);
    const [uploadContentTxt, setUploadContentTxt] = useState('');
    const [uploadContentImg, setUploadContentImg] = useState(null);
    const redirect = useNavigate();
    const contentTxtLengthLimit = 500;

    function formImagePreviewChange(newImg) {
        const img = document.getElementById('uploadFormImgPreview');
        if (img !== null) {
            if (newImg === null) {
                img.src = '#';
            } else {
                img.src = URL.createObjectURL(newImg);
            }
        }
    }
    function userSelectUploadImg(e) {
        setUploadContentImg(e.target.files[0]);
        if (e.target.files && e.target.files[0]) {
            formImagePreviewChange(e.target.files[0]);
        }
    }

    //Render
    return (
        <main className="padded-app-container">
            <h1>{parentPostId === null ? <>Créer une publication</> : <>Poster un commentaire</>}</h1>
            <StyledSendOrCancelContainer>
                <button
                    onClick={() => {
                        redirect(-1, { replace: false });
                    }}
                >
                    Annuler
                </button>
                <button
                    onClick={() => {
                        uploadPost(token, uploadContentTxt, setUploadContentTxt, uploadContentImg, setUploadContentImg, formImagePreviewChange, parentPostId, setShowErrorApiResponse).then((uploadSuccessful) => {
                            if (uploadSuccessful === true) {
                                redirect(-1, { replace: true });
                            }
                        });
                    }}
                >
                    {parentPostId === null ? <>Publier</> : <>Commenter</>}
                </button>
            </StyledSendOrCancelContainer>
            <div>{showErrorApiResponse !== null ? <ErrorMsg>· {showErrorApiResponse} !</ErrorMsg> : null}</div>
            <StyledForm className="uploadForm">
                <StyledLabel htmlFor="uploadFormTxt">Texte</StyledLabel>
                <StyledInputInfo>
                    {uploadContentTxt.length}/{contentTxtLengthLimit}
                </StyledInputInfo>
                <StyledInputText
                    id="uploadFormTxt"
                    name="uploadFormTxt"
                    maxLength={contentTxtLengthLimit}
                    onChange={(e) => {
                        setUploadContentTxt(e.target.value);
                        setShowErrorApiResponse(null);
                    }}
                ></StyledInputText>

                <StyledLabel htmlFor="uploadFormImg">Image</StyledLabel>
                <StyledInputInfo>png, jpg ou gif</StyledInputInfo>
                <StyledInputImage id="uploadFormImg" name="uploadFormImg" type="file" accept="image/png, image/jpg, image/jpeg, image/gif" onChange={(e) => userSelectUploadImg(e)} />
                <StyledImagePreview id="uploadFormImgPreview" src="#" alt="Uploaded content" content={uploadContentImg} />
                {uploadContentImg === null ? (
                    <>
                        {
                            //Aucune image ajoutée
                        }
                        <StyledAddImageArea htmlFor="uploadFormImg">
                            <i className="fa-regular fa-image" />
                            <p>Cliquer pour ajouter une image</p>
                        </StyledAddImageArea>
                    </>
                ) : (
                    <>
                        {
                            //Image ajoutée
                        }
                        <StyleImageManageContainer>
                            <button
                                onClick={(e) => {
                                    document.getElementById('uploadFormImg').click();
                                    e.preventDefault();
                                }}
                            >
                                Changer
                            </button>
                            <button
                                onClick={(e) => {
                                    setUploadContentImg(null);
                                    formImagePreviewChange(null);
                                    e.preventDefault();
                                }}
                            >
                                Retirer
                            </button>
                        </StyleImageManageContainer>
                    </>
                )}
            </StyledForm>
        </main>
    );
}

//Exports
export default PostCreate;
