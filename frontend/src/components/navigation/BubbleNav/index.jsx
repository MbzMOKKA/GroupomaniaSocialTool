//Imports
import BubbleBackground from '../../common/BubbleContainer/index';
import ButtonHome from '../ButtonHome/index';
import ButtonUsers from '../ButtonUsers/index';
import ButtonLogOff from '../ButtonLogOff/index';
import { useLocation } from 'react-router-dom';

//Component
function BubbleNav({ setNavIsOpen }) {
    const location = useLocation();
    return (
        <BubbleBackground setNavIsOpen={setNavIsOpen}>
            {location.pathname !== '/' && <ButtonHome setNavIsOpen={setNavIsOpen} />}
            {location.pathname !== '/users' && <ButtonUsers setNavIsOpen={setNavIsOpen} />}
            <ButtonLogOff setNavIsOpen={setNavIsOpen} />
        </BubbleBackground>
    );
}

//Exports
export default BubbleNav;
