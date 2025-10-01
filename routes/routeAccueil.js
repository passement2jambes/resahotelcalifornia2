// création du routeur Express pour ce module
import express from 'express';
const routeur = express.Router();
import accueil from '../models/modelAccueil.js';

// route pour la page d'accueil
routeur.get('/', (req, res) => {
    res.render('accueil');
});