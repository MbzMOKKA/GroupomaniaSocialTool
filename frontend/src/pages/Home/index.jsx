//Imports
import { /*Link, */ Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { SessionContext } from '../../utils/context/index';

function Home() {
    const { token /*, updateToken*/ } = useContext(SessionContext);
    return (
        <main className="padded-app-container">
            {
                //Redirect to Login page when disconnected
                token === null ? <Navigate to="/login" replace={true} /> : null
            }
            <h1>Dernières publications :</h1>
            <i className="fa-regular fa-comment-dots" />
            Commentaires
            <i className="fa-regular fa-heart" />
            J'aime
            <i className="fa-solid fa-pencil" />
            Créer un publication
            <i className="fa-regular fa-image" />
            Ajouter une image
            <i className="fa-solid fa-circle-chevron-down" />
            Charger plus
        </main>
    );
}

//Exports
export default Home;
