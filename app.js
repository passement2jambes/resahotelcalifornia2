// inclure les dépendances et middlewares
import mysql from 'mysql2/promise';
import express from 'express';
import ejs from 'ejs';
import iniparser from 'iniparser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import routeAccueil from './routes/routeAccueil.js'; 
// reconstituer __dirname dans un module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// activer les dépendances
let configDB = iniparser.parseSync('./config/configDB.ini');
let app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
let mysqlconnexion;

(async () => {
  try {
    mysqlconnexion = await mysql.createConnection({
      host: configDB['dev']['host'],
      user: configDB['dev']['user'],
      password: configDB['dev']['password'],
      database: configDB['dev']['database']
    });

    console.log("BDD connectée ✅");
  } catch (err) {
    console.error("❌ BDD connexion échouée : ", err.message);
  }
})();

// activer le middleware et lancer l'application sur le port 3060
app.use(express.json());
app.use(express.urlencoded());
app.use('/', routeAccueil);

app.listen(3010, () => console.log('Bienvenue à l\'Hotel California !'))