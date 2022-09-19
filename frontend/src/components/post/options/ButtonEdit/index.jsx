//Imports
import { StyledButtonSecondary, IconInButton } from '../../../../utils/style/GlobalStyle';
//Component
function ButtonEdit({ setBubbleIsOpen }) {
    return (
        <StyledButtonSecondary
            onClick={() => {
                setBubbleIsOpen(false);
            }}
        >
            <IconInButton className="fa-solid fa-file-pen" />
            Modifier
        </StyledButtonSecondary>
    );
}

//Exports
export default ButtonEdit;
