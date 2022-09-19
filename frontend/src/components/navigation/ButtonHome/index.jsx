//Imports
import { useNavigate } from 'react-router-dom';
import { StyledButtonSecondary, IconInButton } from '../../../utils/style/GlobalStyle';
//Component
function ButtonHome({ setBubbleIsOpen }) {
    const redirect = useNavigate();
    return (
        <StyledButtonSecondary
            onClick={() => {
                redirect('/', { replace: true });
                setBubbleIsOpen(false);
            }}
        >
            <IconInButton className="fa-solid fa-house" />
            Accueil
        </StyledButtonSecondary>
    );
}

//Exports
export default ButtonHome;
