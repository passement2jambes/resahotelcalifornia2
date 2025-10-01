// inclure les dépendances et middlewares
import mysql from 'mysql2/promise';
import express from 'express';
import ejs from 'ejs';
import iniparser from 'iniparser';

// activer les dépendances
let configDB = iniparser.parseSync('./db.ini');
let app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
let mysqlconnexion = mysql.createConnection({
    host: configDB['dev']['host'],
    user: configDB['dev']['user'],
    password: configDB['dev']['password'],
    database: configDB['dev']['database']
});

//vérification de connexion à la base de donnée
mysqlconnexion.connect((err) => {
    if (!err) console.log('BDD connectée.')
    else console.log('BDD connexion échouée \n Erreur: ' + JSON.stringify(err))
});

// activer le middleware et lancer l'application sur le port 3060
app.use(express.json());
app.use(express.urlencoded());

app.listen(3010, () => console.log('Bienvenue à l\'Hotel California !'))