//Imports
import { StyledButtonSecondary, IconInButton } from '../../../utils/style/GlobalStyle';
import { useContext } from 'react';
import { SessionContext } from '../../../utils/context/index';

//Component
function ButtonLogOff({ setBubbleIsOpen }) {
    const { updateToken, updateAccountInfo } = useContext(SessionContext);

    //Render
    return (
        <StyledButtonSecondary
            onClick={() => {
                updateToken(null);
                updateAccountInfo('???', '???', 0, 0);
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
