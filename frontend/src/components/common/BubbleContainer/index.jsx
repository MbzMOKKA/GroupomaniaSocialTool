//Imports
import { StyledBackground, StyledChildrenContainer } from './style.jsx';

//Component
function BubbleContainer({ setNavIsOpen, children }) {
    return (
        <StyledBackground
            onClick={() => {
                setNavIsOpen(false);
            }}
        >
            <StyledChildrenContainer
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {children}
            </StyledChildrenContainer>
        </StyledBackground>
    );
}

//Exports
export default BubbleContainer;
