//Imports
import icon from '../../assets/icon-left-font-monochrome-white.svg';
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import BubbleNav from '../navigation/BubbleNav/index';
import { StyledIconContainer, StyledIcon, StyledHeader, StyledButtonOpenNav } from './style.jsx';
import { SessionContext } from '../../utils/context/index';

//Component
function Header() {
    const { updateToken } = useContext(SessionContext);
    const [navIsOpen, setNavIsOpen] = useState(false);
    const location = useLocation();

    //Getting the token from the storage when loading the page
    useEffect(() => {
        const prevToken = localStorage.getItem('token');
        if (prevToken === 'null') {
            updateToken(null);
        } else {
            updateToken(prevToken);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Render
    return (
        <>
            {navIsOpen === true ? <BubbleNav setNavIsOpen={setNavIsOpen} /> : null}
            <StyledHeader>
                <StyledIconContainer>
                    <StyledIcon src={icon} alt="icone Groupomania" />
                </StyledIconContainer>
                {location.pathname !== '/signup' && location.pathname !== '/login' && (
                    <StyledButtonOpenNav
                        onClick={() => {
                            setNavIsOpen(true);
                        }}
                    >
                        <i className="fa-solid fa-ellipsis" />
                    </StyledButtonOpenNav>
                )}
            </StyledHeader>
        </>
    );
}

//Exports
export default Header;
