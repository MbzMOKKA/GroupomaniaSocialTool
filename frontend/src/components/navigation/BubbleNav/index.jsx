//Imports
import BubbleContainer from '../../common/BubbleContainer/index';
import ButtonHome from '../ButtonHome/index';
import ButtonUsers from '../ButtonUsers/index';
import ButtonLogOff from '../ButtonLogOff/index';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { SessionContext } from '../../../utils/context/index';

//Component
function BubbleNav({ setBubbleIsOpen }) {
    const { accountInfo } = useContext(SessionContext);
    const location = useLocation();
    return (
        <BubbleContainer setBubbleIsOpen={setBubbleIsOpen}>
            <p>
                <i className="fa-solid fa-circle-user" />
                {accountInfo.displayName} :
            </p>
            {location.pathname !== '/' && <ButtonHome setBubbleIsOpen={setBubbleIsOpen} />}
            {location.pathname !== '/users' && <ButtonUsers setBubbleIsOpen={setBubbleIsOpen} />}
            <ButtonLogOff setBubbleIsOpen={setBubbleIsOpen} />
        </BubbleContainer>
    );
}

//Exports
export default BubbleNav;
