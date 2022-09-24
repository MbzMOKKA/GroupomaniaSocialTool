//Imports
import icon from '../../assets/icon-left-font-monochrome-white.svg';
import { StyledIconContainer, StyledIcon } from './style';

//Component
function HeaderLogo() {
    //Render
    return (
        <StyledIconContainer to="/">
            <StyledIcon src={icon} alt="icone Groupomania" />
        </StyledIconContainer>
    );
}

//Exports
export default HeaderLogo;
