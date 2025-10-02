// création du routeur Express pour ce module
import express from 'express';
const routeur = express.Router();


// route pour la page d'accueil
routeur.get('/', (req, res) => {
    res.render('accueil');
});

export default routeur;