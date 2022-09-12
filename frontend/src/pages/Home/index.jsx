//Imports
//import styled from 'styled-components';

function Home() {
    return (
        <div>
            <h1>Dernières publications :</h1>
            <i className="fa-regular fa-comment-dots" />
            Commentaires
            <i className="fa-regular fa-heart" />
            J'aime
            <i className="fa-solid fa-house" />
            Accueil
            <i className="fa-solid fa-users" />
            Liste utilisateurs
            <i className="fa-solid fa-pencil" />
            Créer un publication
            <i className="fa-regular fa-image" />
            Ajouter une image
            <i className="fa-solid fa-user-check" />
            Reactiver
            <i className="fa-solid fa-lock" />
            Restreindre
            <i className="fa-solid fa-ban" />
            Suspendre
            <i className="fa-solid fa-angles-down" />
            Rétrograder en staff
            <i className="fa-solid fa-angles-up" />
            Promouvoir en modérateur
            <i className="fa-solid fa-power-off" />
            Se déconnecter
            <i className="fa-solid fa-circle-chevron-down" />
            Charger plus
        </div>
    );
}

//Exports
export default Home;
