// inclure les dépendances et middlewares
import mysql from 'mysql2/promise';
import express from 'express';
import ejs from 'ejs';
import iniparser from 'iniparser';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

import routeAccueil from './routes/routeAccueil.js'; 
import routeChambres from './routes/routeChambres.js';


// reconstituer __dirname dans un module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// activer les dépendances
let configDB = iniparser.parseSync('../config/connexion.js'); // lire le fichier de configuration de la base de données
let app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

//se connecter a la bdd avec un try catch, en utilisant le fichier connexion.js 
import configDB2 from './config/connexion.js';
try {
    const connexion = await mysql.createPool(configDB);
    console.log('Connexion à la base de données réussie.'); //A REFAIRE A REFAIRE A REFAIRE A REFAIRE A REFAIRE A REFAIRE A REFAIRE
} catch (error) {
    console.error('Erreur de connexion à la base de données :', error);
    process.exit(1); // Quitter l'application en cas d'erreur de connexion
}

// activer le middleware et lancer l'application sur le port 3060
app.use(express.json());
app.use(express.urlencoded());

app.use('/', routeAccueil);
app.use('/chambres', routeChambres);

app.listen(3010, () => console.log('Bienvenue à l\'Hotel California !'))