//Imports
import { useState } from 'react';
import { StyledButton } from './style.jsx';

//Component
function ButtonScrollTop() {
    const [showButton, setShowButton] = useState(false);

    //Event to show the button only if the page is scrolled
    window.addEventListener('scroll', () => {
        if (window.scrollY > 1) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    });

    //Render
    return (
        <>
            {showButton === true && (
                <StyledButton
                    onClick={(e) => {
                        e.stopPropagation();
                        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
                    }}
                >
                    <i className="fa-solid fa-arrow-up" />
                </StyledButton>
            )}
        </>
    );
}

//Exports
export default ButtonScrollTop;
