import express from 'express';
import ControllerClients from '../controllers/controllerClients.js';

const routeur = express.Router();

// Important: la route /clients/create doit être avant /clients/:id
routeur.get('/clients/create', ControllerClients.formCreateClient);
routeur.post('/clients/create', ControllerClients.createClient);

routeur.get('/clients/update/:id', ControllerClients.formUpdateClient);
routeur.post('/clients/update/:id', ControllerClients.updateClient);

routeur.post('/clients/delete/:id', ControllerClients.deleteClient);

routeur.get('/clients/:id', ControllerClients.clientUnique);
routeur.get('/clients', ControllerClients.listClients);

export default routeur;
