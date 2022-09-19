//Imports
import { useState } from 'react';
import { deletePost } from '../../../../utils/api_communication/index';
import BubbleContainer from '../../../common/BubbleContainer/index';
import { StyledButtonSecondary, IconInButton } from '../../../../utils/style/GlobalStyle';
import { useContext } from 'react';
import { SessionContext } from '../../../../utils/context/index';

//Component
function ButtonDelete({ setBubbleIsOpen, posts, setPosts, postToDeleteId }) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showErrorApiResponse, setShowErrorApiResponse] = useState(null);
    const { token } = useContext(SessionContext);

    //Render
    return (
        <>
            <StyledButtonSecondary
                onClick={() => {
                    setShowConfirmation(true);
                    //setBubbleIsOpen(false);
                }}
            >
                <IconInButton className="fa-solid fa-trash-can" />
                Supprimer
            </StyledButtonSecondary>
            {showErrorApiResponse}
            {
                //Deletion confirm popup
                showConfirmation === true && (
                    <BubbleContainer setBubbleIsOpen={setShowConfirmation}>
                        <p>Êtes-vous sûr ?</p>
                        <StyledButtonSecondary
                            onClick={() => {
                                deletePost(token, postToDeleteId, posts, setPosts, setShowErrorApiResponse);
                                setBubbleIsOpen(false);
                            }}
                        >
                            Oui
                        </StyledButtonSecondary>
                        <StyledButtonSecondary
                            onClick={() => {
                                setShowConfirmation(false);
                            }}
                        >
                            Annuler
                        </StyledButtonSecondary>
                    </BubbleContainer>
                )
            }
        </>
    );
}

//Exports
export default ButtonDelete;
