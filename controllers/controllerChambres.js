//on commence par importer le modele
import ModelChambres from '../models/modelChambres.js';

class ControllerChambres {

    //Afficher toutes les chambres
    static async listChambres(req, res) { // Méthode pour afficher toutes les chambres
        const chambres = await ModelChambres.findall(); // Appelle la méthode findall du modèle pour récupérer toutes les chambres
        res.render('chambres/list', {title : 'Voici la liste des chambres', chambres }); // Rend la vue 'list' en passant les chambres récupérées
    }


    //afficher une chambre
    static async chambreUnique(req, res) { // Méthode pour afficher une chambre unique
        const id = await ModelChambres.findbyid(req.params.id); // Appelle la méthode findbyid du modèle pour récupérer une chambre par son ID
        res.render('chambres/chambre', { title : 'Voici votre chambre', id, chambre }); // Rend la vue 'chambre' en passant la chambre récupérée 

        if (!chambre) { // Si aucune chambre n'est trouvée
            res.status(404).send('Chambre non trouvée'); // Envoie une réponse 404
            return;
        }
    }

    
    //afficher le formulaire de création de chambre

    static async formCreateChambre(req, res) { // Méthode pour afficher le formulaire de création de chambre
        res.render('chambres/create', { title : 'Ajouter une chambre' }); // Rend la vue 'create' pour ajouter une chambre
    }


    //Créer une chambre

    static async createChambre(req, res) { // Méthode pour créer une nouvelle chambre
        const data = { // Récupère les données du formulaire
            numero: req.body.numero,
            capacite: req.body.capacite, 
            disponibilite: req.body.disponibilite
        };
