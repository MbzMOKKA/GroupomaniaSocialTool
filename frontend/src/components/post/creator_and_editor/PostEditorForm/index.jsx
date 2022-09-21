//Imports
import { StyledForm, StyledLabel, StyledInputInfo, StyledInputText, StyledInputImage, StyledAddImageArea, StyleImageManageContainer, StyledImagePreview } from './style';

//Component
function PostEditorForm({ formContentTxt, setFormContentTxt, formContentImg, setFormContentImg, setShowErrorApiResponse }) {
    const contentTxtLengthLimit = 500;
    function formImagePreviewChange(newImg) {
        const img = document.getElementById('postFormImgPreview');
        if (img !== null) {
            if (newImg === null) {
                img.src = '#';
            } else {
                img.src = URL.createObjectURL(newImg);
            }
        }
    }
    function userSelectFormImg(e) {
        setFormContentImg(e.target.files[0]);
        if (e.target.files && e.target.files[0]) {
            formImagePreviewChange(e.target.files[0]);
        }
    }

    //Render
    return (
        <StyledForm className="postForm">
            <StyledLabel htmlFor="postFormTxt">Texte</StyledLabel>
            <StyledInputInfo>
                {formContentTxt.length}/{contentTxtLengthLimit}
            </StyledInputInfo>
            <StyledInputText
                id="postFormTxt"
                name="postFormTxt"
                maxLength={contentTxtLengthLimit}
                onChange={(e) => {
                    setFormContentTxt(e.target.value);
                    setShowErrorApiResponse(null);
                }}
            ></StyledInputText>

            <StyledLabel htmlFor="postFormImg">Image</StyledLabel>
            <StyledInputInfo>png, jpg ou gif</StyledInputInfo>
            <StyledInputImage id="postFormImg" name="postFormImg" type="file" accept="image/png, image/jpg, image/jpeg, image/gif" onChange={(e) => userSelectFormImg(e)} />
            <StyledImagePreview id="postFormImgPreview" src="#" alt="Image attached" content={formContentImg} />
            {formContentImg === 'no_img' ? (
                <>
                    {
                        //Aucune image ajoutée
                    }
                    <StyledAddImageArea htmlFor="postFormImg">
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
                                document.getElementById('postFormImg').click();
                                e.preventDefault();
                            }}
                        >
                            Changer
                        </button>
                        <button
                            onClick={(e) => {
                                setFormContentImg('no_img');
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
    );
}

//Exports
export default PostEditorForm;
