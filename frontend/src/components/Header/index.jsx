//Imports
import icon from '../../assets/icon-left-font-monochrome-white.svg';
import { useState, useEffect, useContext } from 'react';
import BubbleNav from '../navigation/BubbleNav/index';
import { StyledLinkLogo, StyledIcon, StyledHeader, StyledButtonOpenNav } from './style.jsx';
import { SessionContext } from '../../utils/context/index';

//Component
function Header() {
    const { updateToken } = useContext(SessionContext);
    const [navIsOpen, setNavIsOpen] = useState(false);

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
        <div>
            {navIsOpen === true ? <BubbleNav setNavIsOpen={setNavIsOpen} /> : null}
            <StyledHeader>
                <StyledLinkLogo to="/">
                    <StyledIcon id="styledicon" src={icon} alt="icone Groupomania" />
                </StyledLinkLogo>
                <StyledButtonOpenNav
                    onClick={() => {
                        setNavIsOpen(true);
                    }}
                >
                    <i className="fa-solid fa-ellipsis" />
                </StyledButtonOpenNav>
            </StyledHeader>
        </div>
    );
}

//Exports
export default Header;
