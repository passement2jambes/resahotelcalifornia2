//Modele, contient la classe chambres avec les requete sql et la connexion a la bdd comme findall, findbyid, create, update, delete
//ce qu'il faut pour le modele du moins : acceder a la lsite chambres, ajouter une chambre, mdoifier une chambre, supprimer une chambre.

import connexion from '../config/connexion.js';

class ModelChambres { // Création du modèle Chambre
    constructor(data) { // Utilisation du constructeur,data est un objet qui contient les propriétés de la chambre
        this.chambre_id = data.chambre_id;
        this.numero = data.numero;
        this.capacite = data.capacite;
        this.disponibilite = data.disponibilite;
    }

    //Recupére toutes les chambres

    static async findall() { // Fonction (méthode) pour récupérer toutes les chambres
        try {
            const [rows] = await connexion.execute('SELECT * FROM chambres'); // Requête SQL pour sélectionner toutes les chambres et les stocker dans rows
            return rows.map(row => new ModelChambres(row)); //Retourne en tableau d'objets les chambres
        }
        catch (error) {
            throw new Error('Erreur lors de la récupération des chambres: ' + error.message);
        }
    }

    //Recupére une chambre par son id

    static async findbyid(id) {
        try {
            const [rows] = await connexion.execute('SELECT * FROM chambres WHERE idChambre = ?', [id]);
            return rows.length > 0 ? new ModelChambres(rows[0]) : null;
        }
        catch (error) {
            throw new Error('Erreur lors de la récupération de la chambre: ' + error.message);
        }
    }

    //Créer une chambre

    static async create(data) { // Méthode pour créer une nouvelle chambre
        try {
            const [result] = await connexion.execute('INSERT INTO chambres (numero, capacite, disponibilite) VALUES (?, ?, ?)',
                [data.numero, data.capacite, data.disponibilite]
            ); // Requête SQL pour insérer une nouvelle chambre
            return result.insertId; // Retourne l'ID de la nouvelle chambre créée
        }
        catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error('Erreur : Le numéro de chambre existe déjà.');
            }
            throw new Error('Erreur lors de la création de la chambre: ' + error.message);
        }
    }

    //Mettre à jour une chambre

    static async update(id, data) {
        try {
            await connexion.execute(
                'UPDATE chambres SET numero = ?, capacite = ?, disponibilite = ? WHERE idChambre = ?',
                [data.numero, data.capacite, data.disponibilite, id]
            );
        }
        catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error('Erreur : Le numéro de chambre existe déjà.');
            }
            throw new Error('Erreur lors de la mise à jour de la chambre: ' + error.message);
        }
    }

    //Supprimer une chambre

    static async delete(id) {
        try {
            await connexion.execute('DELETE FROM chambres WHERE idChambre = ?', [id]);
        } catch (error) {
            throw new Error('Erreur lors de la suppression de la chambre: ' + error.message);
        }
    }
}

export default ModelChambres; // Exportation du modèle Chambre pour l'utiliser dans d'autres fichiers