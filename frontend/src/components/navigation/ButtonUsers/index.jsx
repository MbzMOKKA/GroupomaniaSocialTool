//Imports
import { useNavigate } from 'react-router-dom';
import { StyledButtonSecondary, IconInButton } from '../../../utils/style/GlobalStyle';
//Component
function ButtonUsers({ setNavIsOpen }) {
    const redirect = useNavigate();
    return (
        <StyledButtonSecondary
            onClick={(e) => {
                e.preventDefault();
                redirect('/users', { replace: true });
                setNavIsOpen(false);
            }}
        >
            <IconInButton className="fa-solid fa-users" />
            Utilisateurs
        </StyledButtonSecondary>
    );
}

//Exports
export default ButtonUsers;
