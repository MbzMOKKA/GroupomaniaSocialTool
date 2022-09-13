//Imports
import { StyledBluring, StyledBackground, StyledChildrenContainer } from './style.jsx';

//Component
function BubbleContainer({ setNavIsOpen, children }) {
    return (
        <>
            <StyledBluring></StyledBluring>
            <StyledBackground
                onClick={() => {
                    setNavIsOpen(false);
                }}
            >
                <StyledChildrenContainer
                    className="padded-app-container"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {children}
                </StyledChildrenContainer>
            </StyledBackground>
        </>
    );
}

//Exports
export default BubbleContainer;
