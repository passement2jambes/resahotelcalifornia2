// création du routeur Express pour ce module
const express = require('express');
const routeur = express.Router();
const accueil = require('../models/modelAccueil');

// route pour la page d'accueil
routeur.get('/', (req, res) => {
    res.render('accueil');
});