import mysql from 'mysql2/promise';
import configDB from '../config/configDB.js';

class ModelClients {
    constructor(data) {
        this.id_client = data.id_client;
        this.nom = data.nom;
        this.prenom = data.prenom;
        this.email = data.email;
        this.telephone = data.telephone;
        // Ajoute les champs que tu as dans ta table clients
    }

    // Récupère tous les clients
    static async findall() {
        const [rows] = await configDB.mysqlconnexion.execute('SELECT * FROM clients');
        return rows.map(row => new ModelClients(row));
    }

    // Récupère un client par id
    static async findbyid(id) {
        const [rows] = await configDB.mysqlconnexion.execute('SELECT * FROM clients WHERE id = ?', [id]);
        if (rows.length === 0) {
            return null;
        }
        return new ModelClients(rows[0]);
    }

    // Crée un nouveau client
    static async create(data) {
        await configDB.mysqlconnexion.execute(
            'INSERT INTO clients (nom, prenom, email, telephone) VALUES (?, ?, ?, ?)',
            [data.nom, data.prenom, data.email, data.telephone]
        );
    }

    // Met à jour un client existant
    static async update(id, data) {
        await configDB.mysqlconnexion.execute(
            'UPDATE clients SET nom = ?, prenom = ?, email = ?, telephone = ? WHERE id = ?',
            [data.nom, data.prenom, data.email, data.telephone, id]
        );
    }

    // Supprime un client
    static async delete(id) {
        await configDB.mysqlconnexion.execute(
            'DELETE FROM clients WHERE id = ?',
            [id]
        );
    }
}

export default ModelClients;