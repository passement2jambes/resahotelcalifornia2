// models/modelClients.js (ESM)
import pool from '../config/connexion.js';

export async function getAll() {
  const [rows] = await pool.query(
    'SELECT id, nom, prenom, email, telephone FROM clients ORDER BY id DESC'
  );
  return rows;
}

export async function getById(id) {
  const [rows] = await pool.query(
    'SELECT id, nom, prenom, email, telephone FROM clients WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

export async function create({ nom, prenom, email, telephone }) {
  const [res] = await pool.query(
    'INSERT INTO clients (nom, prenom, email, telephone) VALUES (?, ?, ?, ?)',
    [nom, prenom, email, telephone]
  );
  return res.insertId;
}

export async function update(id, { nom, prenom, email, telephone }) {
  await pool.query(
    'UPDATE clients SET nom = ?, prenom = ?, email = ?, telephone = ? WHERE id = ?',
    [nom, prenom, email, telephone, id]
  );
}

export async function remove(id) {
  await pool.query('DELETE FROM clients WHERE id = ?', [id]);
}
