//Imports
import icon from '../../assets/icon-left-font-monochrome-white.svg';
import { StyledIconContainer, StyledIcon } from './style';
import { useLocation } from 'react-router-dom';

//Component
function HeaderLogo() {
    const location = useLocation();

    //To disable the link to the homepage when not logged-in
    const inAuthPage = location.pathname === '/login' || location.pathname === '/signup';
    const destination = inAuthPage ? '#' : '/';

    //Render
    return (
        <StyledIconContainer to={destination}>
            <StyledIcon src={icon} alt="icone Groupomania" />
        </StyledIconContainer>
    );
}

//Exports
export default HeaderLogo;
