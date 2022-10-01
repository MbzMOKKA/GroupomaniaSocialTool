//Imports
import { useNavigate } from 'react-router-dom';
import { getMyAccountInfo } from '../../utils/api_communication/index';
import { getPageSubTitle } from '../../utils/misc/index';
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import BubbleNav from '../navigation/BubbleNav/index';
import { StyledRestrainedMsg, StyledHeader, StyledButtonOpenNav } from './style.jsx';
import { SessionContext, NotificationContext } from '../../utils/context/index';
import HeaderLogo from '../../subcomponents/HeaderLogo/index';

//Component
function Header() {
    const { token, updateToken, accountInfo, updateAccountInfo } = useContext(SessionContext);
    const { unread, setUnread } = useContext(NotificationContext);
    const [navIsOpen, setNavIsOpen] = useState(false);
    const [tokenCheckedFromLS, setTokenCheckedFromLS] = useState(false);
    const location = useLocation();
    const redirect = useNavigate();

    //Getting the token from the storage when loading the page
    useEffect(() => {
        const prevToken = localStorage.getItem('token');
        if (prevToken === 'null') {
            updateToken(null);
            redirect('/login', { replace: true });
        } else {
            updateToken(prevToken);
        }
        setTokenCheckedFromLS(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Getting the account info when connected, redirect to the login page when disconnected
    useEffect(() => {
        if (token !== null) {
            getMyAccountInfo(token, updateToken, updateAccountInfo);
        } else {
            if (tokenCheckedFromLS === true) {
                redirect('/login', { replace: true });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    //Changing the page title when new messages are recieved or page is changed
    useEffect(() => {
        let name = ``;
        if (unread > 0) {
            name = name + `(${unread}) `;
        }
        name = name + getPageSubTitle(location.pathname);
        name = name + `Groupomania`;
        document.title = name;
    }, [unread, location.pathname]);

    //Resetting the unread to 0 when page is focused
    window.addEventListener('focus', () => {
        setUnread(0);
    });

    //Render
    return (
        <>
            {navIsOpen === true ? <BubbleNav setBubbleIsOpen={setNavIsOpen} /> : null}
            {accountInfo.state === 1 && (
                <StyledRestrainedMsg>
                    <i className="fa-solid fa-circle-info" />
                    Compte restreind
                </StyledRestrainedMsg>
            )}
            <StyledHeader>
                <HeaderLogo />
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
