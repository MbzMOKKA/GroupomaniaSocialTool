//Imports
import { StyledButtonSecondary, IconInButton } from '../../../utils/style/GlobalStyle';
import { useContext } from 'react';
import { SessionContext } from '../../../utils/context/index';
//Component
function ButtonLogOff({ setNavIsOpen }) {
    const { updateToken } = useContext(SessionContext);
    return (
        <StyledButtonSecondary
            onClick={(e) => {
                e.preventDefault();
                updateToken(null);
                setNavIsOpen(false);
            }}
        >
            <IconInButton className="fa-solid fa-power-off" />
            Se déconnecter
        </StyledButtonSecondary>
    );
}

//Exports
export default ButtonLogOff;
