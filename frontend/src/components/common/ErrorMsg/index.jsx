//Imports
import { StyledContainer } from './style.jsx';

//Component
function ErrorMsg({ children }) {
    //Render
    return (
        <StyledContainer className="error-msg">
            <strong>{children}</strong>
        </StyledContainer>
    );
}

//Exports
export default ErrorMsg;
