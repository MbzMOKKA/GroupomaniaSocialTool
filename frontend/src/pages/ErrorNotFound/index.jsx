//Imports
import { Link } from 'react-router-dom';
import { StyledTitle, StyledExplaination } from './style';

//Component
function ErrorNotFound() {
    //Render
    return (
        <main className="padded-app-container">
            <StyledTitle>
                <i className="fa-solid fa-triangle-exclamation" />
                Erreur 404
            </StyledTitle>
            <StyledExplaination>Cette page n'existe pas</StyledExplaination>
            <p>
                <Link to="/">Retourner en lieu sûr</Link>
            </p>
        </main>
    );
}

//Exports
export default ErrorNotFound;
