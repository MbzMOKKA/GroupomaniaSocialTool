//Imports
import { StyledBluring, StyledBackground, StyledChildrenContainer } from './style.jsx';

//Component
function BubbleContainer({ setBubbleIsOpen, children }) {
    return (
        <>
            <StyledBluring></StyledBluring>
            <StyledBackground
                onClick={() => {
                    setBubbleIsOpen(false);
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
