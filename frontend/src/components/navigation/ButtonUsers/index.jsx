//Imports
import { useNavigate } from 'react-router-dom';
import { StyledButtonSecondary, IconInButton } from '../../../utils/style/GlobalStyle';

//Component
function ButtonUsers({ setBubbleIsOpen }) {
    const redirect = useNavigate();

    //Render
    return (
        <StyledButtonSecondary
            onClick={() => {
                redirect('/users', { replace: false });
                setBubbleIsOpen(false);
            }}
        >
            <IconInButton className="fa-solid fa-users" />
            Utilisateurs
        </StyledButtonSecondary>
    );
}

//Exports
export default ButtonUsers;
