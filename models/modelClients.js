import mysql from 'mysql2/promise';
import configDB from '../config/configDB.js';

class ModelClients {
    constructor(data) {
        this.id = data.id_client;  // renommé en id pour cohérence
        this.nom = data.nom;
        this.prenom = data.prenom;
        this.email = data.email;
        this.telephone = data.telephone;
    }

    static async findall() {
        try {
            const [rows] = await configDB.mysqlconnexion.execute('SELECT * FROM clients');
            return rows.map(row => new ModelClients(row));
        } catch (error) {
            throw error;
        }
    }

    static async findbyid(id) {
        try {
            const [rows] = await configDB.mysqlconnexion.execute('SELECT * FROM clients WHERE id_client = ?', [id]);
            if (rows.length === 0) {
                return null;
            }
            return new ModelClients(rows[0]);
        } catch (error) {
            throw error;
        }
    }

    static async create(data) {
        try {
            await configDB.mysqlconnexion.execute(
                'INSERT INTO clients (nom, prenom, email, telephone) VALUES (?, ?, ?, ?)',
                [data.nom, data.prenom, data.email, data.telephone]
            );
        } catch (error) {
            throw error;
        }
    }

    static async update(id, data) {
        try {
            await configDB.mysqlconnexion.execute(
                'UPDATE clients SET nom = ?, prenom = ?, email = ?, telephone = ? WHERE id_client = ?',
                [data.nom, data.prenom, data.email, data.telephone, id]
            );
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            await configDB.mysqlconnexion.execute(
                'DELETE FROM clients WHERE id_client = ?',
                [id]
            );
        } catch (error) {
            throw error;
        }
    }
}

export default ModelClients;
