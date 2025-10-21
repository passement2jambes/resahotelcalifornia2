// inclure les dépendances et middlewares
import mysql from 'mysql2/promise';
import express from 'express';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

import routeAccueil from './routes/routeAccueil.js'; 

// reconstituer __dirname dans un module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// activer les dépendances
let app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

// Use the config/connexion.js pool that already creates a pool
import dbPool from './config/connexion.js';

try {
    // Test the pool by acquiring/releasing a connection
    const conn = await dbPool.getConnection();
    // optional quick test query
    await conn.query('SELECT 1');
    conn.release();
    console.log('Connexion à la base de données réussie.');
} catch (error) {
    console.error('Erreur de connexion à la base de données :', error);
    process.exit(1); // Quitter l'application en cas d'erreur de connexion
}

// activer le middleware et lancer l'application sur le port 3010
app.use(express.json());
// pass options to urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/', routeAccueil);

app.listen(3010, () => console.log('Bienvenue à l\'Hotel California !'))

