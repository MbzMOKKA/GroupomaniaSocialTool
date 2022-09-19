//Imports
import { StyledButtonSecondary, IconInButton } from '../../../utils/style/GlobalStyle';
import { useContext } from 'react';
import { SessionContext } from '../../../utils/context/index';
//Component
function ButtonLogOff({ setBubbleIsOpen }) {
    const { updateToken } = useContext(SessionContext);
    return (
        <StyledButtonSecondary
            onClick={() => {
                updateToken(null);
                setBubbleIsOpen(false);
            }}
        >
            <IconInButton className="fa-solid fa-power-off" />
            Se déconnecter
        </StyledButtonSecondary>
    );
}

//Exports
export default ButtonLogOff;
