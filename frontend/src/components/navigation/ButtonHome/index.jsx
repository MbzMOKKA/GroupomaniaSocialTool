//Imports
import { useNavigate } from 'react-router-dom';
import { StyledButtonSecondary, IconInButton } from '../../../utils/style/GlobalStyle';
//Component
function ButtonHome({ setNavIsOpen }) {
    const redirect = useNavigate();
    return (
        <StyledButtonSecondary
            onClick={(e) => {
                e.preventDefault();
                redirect('/', { replace: true });
                setNavIsOpen(false);
            }}
        >
            <IconInButton className="fa-solid fa-house" />
            Accueil
        </StyledButtonSecondary>
    );
}

//Exports
export default ButtonHome;
