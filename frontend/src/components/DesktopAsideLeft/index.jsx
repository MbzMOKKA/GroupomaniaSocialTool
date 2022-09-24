//Imports
import HeaderLogo from '../../subcomponents/HeaderLogo/index';
import { StyledAsideLeft } from './style';

//Component
function DesktopAsideLeft() {
    //Render
    return (
        <StyledAsideLeft className="desktop-aside">
            <HeaderLogo />
        </StyledAsideLeft>
    );
}

//Exports
export default DesktopAsideLeft;
