//Imports
import { StyledAsideRight, StyledDisplayName, StyledNav } from './style';
import ButtonHome from '../navigation/ButtonHome/index';
import ButtonUsers from '../navigation/ButtonUsers/index';
import ButtonLogOff from '../navigation/ButtonLogOff/index';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { SessionContext } from '../../utils/context/index';

//Component
function DesktopAsideRight() {
    const { accountInfo } = useContext(SessionContext);
    const location = useLocation();
    function simulateSetBubbleIsOpen() {}

    //Render
    return (
        <StyledAsideRight className="desktop-aside">
            {location.pathname !== '/signup' && location.pathname !== '/login' && (
                <div>
                    <StyledDisplayName>
                        <i className="fa-solid fa-circle-user" />
                        {accountInfo.displayName} :
                    </StyledDisplayName>
                    <StyledNav>
                        {location.pathname !== '/' && <ButtonHome setBubbleIsOpen={simulateSetBubbleIsOpen} />}
                        {location.pathname !== '/users' && <ButtonUsers setBubbleIsOpen={simulateSetBubbleIsOpen} />}
                        <ButtonLogOff setBubbleIsOpen={simulateSetBubbleIsOpen} />
                    </StyledNav>
                </div>
            )}
        </StyledAsideRight>
    );
}

//Exports
export default DesktopAsideRight;
