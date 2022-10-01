//Imports
import { useNavigate } from 'react-router-dom';
import { StyledButtonSecondary, IconInButton } from '../../../utils/style/GlobalStyle';

//Component
function ButtonHome({ setBubbleIsOpen }) {
    const redirect = useNavigate();

    //Render
    return (
        <StyledButtonSecondary
            onClick={() => {
                redirect('/', { replace: false });
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
