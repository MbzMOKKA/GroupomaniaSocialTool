### 1. INSTALLER L'APPLICATION :

· Prérequis :
    - Avoir installer NodeJS
    - Avoir télécharger le fichier "pierrot_dylan_1_code_082022.txt" dans les livrables

· Étapes :
    - Ouvrir Git Bash là où vous souhaitez installer l'application
    - Executer la commande suivante : git clone https://github.com/MbzMOKKA/groupomania_social_tool.git
    - Le dossier "groupomania_social_tool" devrait apparaitre
    - Executer la commande suivante dans le sous-dossier "backend" et dans le sous-dossier "frontend" : npm install
    -Fichier .env :
        PORT={PORT UTILISÉ}
        DB_LOGIN='{LIEN CONNEXION BDD}'
        TOKEN_SECRET_WORD='{SECRET D'ENCRYPTAGE}'
        HOMEPAGE_POST_SENT_AT_ONCE={NOMBRE DE POST A CHARGER DANS L'ACCUEIL}
        -exemple :
            PORT=8000
            DB_LOGIN='mongodb://localhost:27017/Groupomania'
            TOKEN_SECRET_WORD='a651z4875ij416s89t4118864ez19f'
            HOMEPAGE_POST_SENT_AT_ONCE=3


### 2. IMPORTER LA BASE DE DONNÉES :

· Prérequis :
    - Avoir installer MongoDB Shell ou MongoDB Compass ou utiliser MongoDB Atlas
    - Avoir installer MongoDB Database Tools
    - Avoir télécharger le dossier "pierrot_dylan_2_bdd_082022" dans les livrables

· Étapes (MongoDB Shell ou MongoDB Compass) :
    - Déplacer le dossier "Groupomania" du dossier "pierrot_dylan_2_bdd_082022" vers le dossier "MongoDB/bin" là où MongoDB Database Tools à été installer
    - Ouvrir l'invite de commande et se positionner dans le dossier "bin" dans lequel vous venez juste de déplacer le dossier "Groupomania"
    - Executer la commande suivante : mongorestore -d Groupomania ./Groupomania

· Étapes (MongoDB Atlas) :
    - Déplacer le dossier "Groupomania" du dossier "pierrot_dylan_2_bdd_082022" vers le dossier "MongoDB/bin" là où MongoDB Database Tools à été installer
    - Ouvrir l'invite de commande et se positionner dans le dossier "bin" dans lequel vous venez juste de déplacer le dossier "Groupomania"
    - Executer la commande suivante (remplacer {USER},{PASSWORD} et {CLUSTER} par les bonnes informations de connexion) : mongorestore --uri "mongodb+srv://{USER}:{PASSWORD}@{CLUSTER}.mongodb.net/Groupomania" ./mongo-backup/Groupomania



### 3. LANCER L'APPLICATION :

· Prérequis :
    - Avoir installer l'application
    - Avoir importer la base de données

· Étapes :
    - Executer la commande suivante dans le dossier "groupomania_social_tool/backend" : node server
    - Attendre quelques secondes : les messages "Listening on port 8000" et "Connection to MongoDB successful!" devraient apparaitre si le serveur s'est lancé correctement
    - Ouvrir un nouveau terminal
    - Executer la commande suivante dans le dossier "groupomania_social_tool/frontend" : npm run start
    - Attendre quelques secondes jusqu'à la fin de la compilation : un nouvel onglet à l'adresse "http://localhost:3000" sera ouvert dans votre navigateur par défaut et un message de réussite apparaitra dans le terminal