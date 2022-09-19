//Imports
import { useNavigate } from 'react-router-dom';
import { StyledButtonSecondary, IconInButton } from '../../../utils/style/GlobalStyle';
//Component
function ButtonUsers({ setBubbleIsOpen }) {
    const redirect = useNavigate();
    return (
        <StyledButtonSecondary
            onClick={() => {
                redirect('/users', { replace: true });
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
