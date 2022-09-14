//Imports
import icon from '../../assets/icon-left-font-monochrome-white.svg';
import { useNavigate } from 'react-router-dom';
import { getMyAccountInfo } from '../../utils/api_communication/index';
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import BubbleNav from '../navigation/BubbleNav/index';
import { StyledIconContainer, StyledIcon, StyledHeader, StyledButtonOpenNav } from './style.jsx';
import { SessionContext } from '../../utils/context/index';

//Component
function Header() {
    const { token, updateToken, updateAccountInfo } = useContext(SessionContext);
    const [navIsOpen, setNavIsOpen] = useState(false);
    const [tokenCheckedFromLS, setTokenCheckedFromLS] = useState(false);
    const location = useLocation();
    const redirect = useNavigate();

    //Getting the token from the storage when loading the page
    useEffect(() => {
        const prevToken = localStorage.getItem('token');
        if (prevToken === 'null') {
            updateToken(null);
        } else {
            updateToken(prevToken);
        }
        setTokenCheckedFromLS(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Getting the account info when connected, redirect to the login page when disconnected
    useEffect(() => {
        if (token !== null) {
            getMyAccountInfo(token, updateToken, updateAccountInfo, redirect);
        } else {
            if (tokenCheckedFromLS === true) {
                redirect('/login', { replace: true });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

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
