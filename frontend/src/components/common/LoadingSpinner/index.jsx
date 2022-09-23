//Imports
import { StyledContainer, StyledSpinner, StyledText } from './style.jsx';

//Component
function LoadingSpinner() {
    //Render
    return (
        <StyledContainer>
            <StyledSpinner className="fa-solid fa-rotate" />
            <StyledText>Chargement...</StyledText>
        </StyledContainer>
    );
}

//Exports
export default LoadingSpinner;
