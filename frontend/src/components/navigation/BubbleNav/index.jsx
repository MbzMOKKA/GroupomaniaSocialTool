//Imports
import BubbleBackground from '../../common/BubbleContainer/index';
import ButtonHome from '../ButtonHome/index';
import ButtonUsers from '../ButtonUsers/index';
import ButtonLogOff from '../ButtonLogOff/index';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { SessionContext } from '../../../utils/context/index';

//Component
function BubbleNav({ setNavIsOpen }) {
    const { accountInfo } = useContext(SessionContext);
    const location = useLocation();
    return (
        <BubbleBackground setNavIsOpen={setNavIsOpen}>
            <p>
                <i className="fa-solid fa-circle-user" />
                {accountInfo.displayName} :
            </p>
            {location.pathname !== '/' && <ButtonHome setNavIsOpen={setNavIsOpen} />}
            {location.pathname !== '/users' && <ButtonUsers setNavIsOpen={setNavIsOpen} />}
            <ButtonLogOff setNavIsOpen={setNavIsOpen} />
        </BubbleBackground>
    );
}

//Exports
export default BubbleNav;
