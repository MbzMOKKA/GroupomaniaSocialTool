//Imports
import { useNavigate } from 'react-router-dom';
import { StyledButtonSecondary, IconInButton } from '../../../utils/style/GlobalStyle';

//Component
function ButtonEdit({ setBubbleIsOpen, postId, postIsDetailled }) {
    const redirect = useNavigate();

    //Render
    return (
        <StyledButtonSecondary
            onClick={() => {
                redirect(`/posts/edit/${postId}`, { replace: false });
                if (postIsDetailled === false) {
                    setBubbleIsOpen(false);
                }
            }}
        >
            <IconInButton className="fa-solid fa-file-pen" />
            Modifier
        </StyledButtonSecondary>
    );
}

//Exports
export default ButtonEdit;
