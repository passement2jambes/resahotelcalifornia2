import express from 'express';
import ControllerChambres from '../controllers/controllerChambres.js';

const routeur = express.Router();

//route pour afficher toutes les chambres
routeur.get('/chambres', ControllerChambres.listChambres);
//route pour afficher une chambre par son id
routeur.get('/chambres/:id', ControllerChambres.chambreUnique);

//route pour afficher le formulaire de création de chambre
routeur.get('/chambres/create', ControllerChambres.formCreateChambre);
//route pour créer une chambre
routeur.post('/chambres/create', ControllerChambres.createChambre);

//route pour afficher le formulaire de modification de chambre
routeur.get('/chambres/update/:id', ControllerChambres.formUpdateChambre);
//route pour mettre à jour une chambre
routeur.post('/chambres/update/:id', ControllerChambres.updateChambre);

//route pour supprimer une chambre


export default routeur;