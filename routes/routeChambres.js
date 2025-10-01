//imran
// création du routeur Express pour ce module
const express = require('express');
const routeur = express.Router();
const accueil = require('../models/modelChambres');

// route pour la page d'accueil
routeur.get('/chambres', (req, res) => {
    res.render('chambres');
});


