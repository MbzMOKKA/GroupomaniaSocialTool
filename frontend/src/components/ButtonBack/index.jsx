//Imports
import { useNavigate } from 'react-router-dom';
import { StyledButton } from './style.jsx';

//Component
function ButtonBack() {
    const redirect = useNavigate();

    //Render
    return (
        <>
            <StyledButton
                onClick={() => {
                    redirect(-1);
                }}
            >
                <i className="fa-solid fa-arrow-left" />
            </StyledButton>
        </>
    );
}

//Exports
export default ButtonBack;
