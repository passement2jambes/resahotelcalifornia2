//Modele, Controller, route puis vue. 
//Modele, contient la classe chambres avec les requete sql et la connexion a la bdd comme findall, findbyid, create, update, delete
//ce qu'il faut pour le modele du moins : acceder a la lsite chambres, ajouter une chambre, mdoifier une chambre, supprimer une chambre.

//
import mysql from 'mysql2/promise';
import configDB from '../config/configDB.js';

class ModelChambres { // Création du modèle Chambre
    constructor(data) { // Utilisation du constructeur,data est un objet qui contient les propriétés de la chambre
        this.chambre_id = data.chambre_id;
        this.numero = data.numero; 
        this.capacite = data.capacite;
        this.disponibilite = data.disponibilite;
    }

    //Recupére toutes les chambres

    static async findall() { // Fonction (méthode) pour récupérer toutes les chambres
        const [rows] = await configDB.mysqlconnexion.execute('SELECT * FROM chambres'); // Requête SQL pour sélectionner toutes les chambres et les stocker dans rows
        return rows.map(row => new ModelChambres(row)); //Retourne en tableau d'objets les chambres
    }

    //Recupére une chambre par son id

    static async findbyid(id) { // Méthode pour récupérer une chambre par son ID
        const [rows] = await configDB.mysqlconnexion.execute('SELECT * FROM chambres WHERE id = ?'); // Requête SQL pour sélectionner une chambre par son ID
        if (rows.length === 0) {
            return null; // Si aucune chambre n'est trouvée, retourne null
        }
        return new ModelChambres(rows[0]); // Retourne un objet chambre
    }

    //Créer une chambre

    static async create(data) { // Méthode pour créer une nouvelle chambre
        await configDB.mysqlconnexion.execute('INSERT INTO chambres (numero, capacite, disponibilite) VALUES (?, ?, ?)',
        [data.numero, data.capacite, data.disponibilite]); // Requête SQL pour insérer une nouvelle chambre
    }

    //Mettre à jour une chambre

    static async update(id, data) { // Méthode pour mettre à jour une chambre existante, id est l'identifiant de la chambre à mettre à jour, data est un objet contenant les nouvelles propriétés de la chambre
        await configDB.mysqlconnexion.execute('UPDATE chambres SET numero = ?, capacite = ?, disponibilite = ? WHERE id = ?',
        [data.numero, data.capacite, data.disponibilite, id]); // Requête SQL pour mettre à jour une chambre
    }

    //Supprimer une chambre
    
}

export default ModelChambres; // Exportation du modèle Chambre pour l'utiliser dans d'autres fichiers