import modelClients from '../models/modelClients.js';

class ControllerClients {

    static async listClients(req, res) {
        try {
            const clients = await modelClients.findall();
            res.render('clients/list', { title: 'Voici la liste des clients', clients });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erreur serveur');
        }
    }

    static async clientUnique(req, res) {
        try {
            const id = req.params.id;
            const client = await modelClients.findbyid(id);
            if (!client) {
                res.status(404).send('Client non trouvé');
                return;
            }
            res.render('clients/client', { title: 'Voici votre client', client });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erreur serveur');
        }
    }

    static async formCreateClient(req, res) {
        res.render('clients/create', { title: 'Ajouter un client' });
    }

    static async createClient(req, res) {
        try {
            const data = {
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                telephone: req.body.telephone
            };
            await modelClients.create(data);
            res.redirect('/clients');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erreur serveur');
        }
    }

    static async formUpdateClient(req, res) {
        try {
            const id = req.params.id;
            const client = await modelClients.findbyid(id);
            if (!client) {
                res.status(404).send('Client non trouvé');
                return;
            }
            res.render('clients/update', { title: 'Modifier un client', client });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erreur serveur');
        }
    }

    static async updateClient(req, res) {
        try {
            const id = req.params.id;
            const data = {
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                telephone: req.body.telephone
            };
            await modelClients.update(id, data);
            res.redirect('/clients');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erreur serveur');
        }
    }

    static async deleteClient(req, res) {
        try {
            const id = req.params.id;
            await modelClients.delete(id);
            res.redirect('/clients');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erreur serveur');
        }
    }
}

export default ControllerClients;
