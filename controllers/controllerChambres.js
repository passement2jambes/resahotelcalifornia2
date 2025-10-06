//on commence par importer le modele
import modelChambres from '../models/modelChambres.js';

class ControllerChambres {

    //Afficher toutes les chambres
    static async listChambres(req, res) { // Méthode pour afficher toutes les chambres
        const chambres = await modelChambres.findall(); // Appelle la méthode findall du modèle pour récupérer toutes les chambres
        res.render('chambres/list', {title : 'Voici la liste des chambres', chambres }); // Rend la vue 'list' en passant les chambres récupérées
    }


    //afficher une chambre
    static async chambreUnique(req, res) { // Méthode pour afficher une chambre unique
        const id = await modelChambres.findbyid(req.params.id); // Appelle la méthode findbyid du modèle pour récupérer une chambre par son ID
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
        await modelChambres.create(data); // Appelle la méthode create du modèle pour insérer une nouvelle chambre
        res.redirect('/chambres'); // Redirige vers la liste des chambres après la création
    }


    //afficher le formulaire de modification de chambre

    static async formUpdateChambre(req, res) { // Méthode pour afficher le formulaire de modification de chambre
        res.render('chambres/update', { title : 'Modifier une chambre' }); // Rend la vue 'update' pour modifier une chambre
    }

    //mettre à jour une chambre

    static async updateChambre(req, res) { 
        const id = req.params.id;
        const data = { // Récupère les données du formulaire
            numero: req.body.numero, //body car les données viennent du formulaire
            capacite: req.body.capacite,
            disponibilite: req.body.disponibilite
        };
        await modelChambres.update(id, data); // Appelle la méthode update du modèle pour mettre à jour une chambre
        res.redirect('/chambres'); // Redirige vers la liste des chambres après la mise à jour
    }

    //supprimer une chambre

}

export default ControllerChambres;