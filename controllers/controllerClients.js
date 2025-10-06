import modelClients from '../models/modelClients.js';

class ControllerClients {

    // Afficher tous les clients
    static async listClients(req, res) {
        const clients = await modelClients.findall();
        res.render('clients/list', { title: 'Voici la liste des clients', clients });
    }

    // Afficher un client unique
    static async clientUnique(req, res) {
        const client = await modelClients.findbyid(req.params.id);
        if (!client) {
            res.status(404).send('Client non trouvé');
            return;
        }
        res.render('clients/client', { title: 'Voici votre client', client });
    }

    // Afficher le formulaire de création de client
    static async formCreateClient(req, res) {
        res.render('clients/create', { title: 'Ajouter un client' });
    }

    // Créer un client
    static async createClient(req, res) {
        const data = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            telephone: req.body.telephone
            // ajoute ici les autres champs selon ton modèle
        };
        await modelClients.create(data);
        res.redirect('/clients');
    }

    // Afficher le formulaire de modification de client
    static async formUpdateClient(req, res) {
        const client = await modelClients.findbyid(req.params.id);
        if (!client) {
            res.status(404).send('Client non trouvé');
            return;
        }
        res.render('clients/update', { title: 'Modifier un client', client });
    }

    // Mettre à jour un client
    static async updateClient(req, res) {
        const id = req.params.id;
        const data = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            telephone: req.body.telephone
            // adapte selon la structure de la table
        };
        await modelClients.update(id, data);
        res.redirect('/clients');
    }

    // Supprimer un client
    static async deleteClient(req, res) {
        const id = req.params.id;
        await modelClients.delete(id);
        res.redirect('/clients');
    }
}

export default ControllerClients;
