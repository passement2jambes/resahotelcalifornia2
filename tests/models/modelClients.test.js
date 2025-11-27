import { describe, it, expect, vi, beforeEach } from 'vitest'
import ModelClients from '../models/ModelClients.js'
import configDB from '../config/configDB.js'

// On simule la connexion MySQL
vi.mock('../../config/configDB.js', () => ({
  default: {
    mysqlconnexion: {
      execute: vi.fn()
    }
  }
}))

describe('Tests sur la classe ModelClients', () => {
  // Reset des mocks avant chaque test
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Test de findall()
  it('findall() doit renvoyer une liste de clients', async () => {
    const fakeRows = [
      { id_client: 1, nom: 'Dupont', prenom: 'Jean', email: 'jean@example.com', telephone: '0600000000' },
      { id_client: 2, nom: 'Durand', prenom: 'Paul', email: 'paul@example.com', telephone: '0611111111' }
    ]
    configDB.mysqlconnexion.execute.mockResolvedValueOnce([fakeRows])

    const clients = await ModelClients.findall()

    expect(configDB.mysqlconnexion.execute).toHaveBeenCalledWith('SELECT * FROM clients')
    expect(clients).toHaveLength(2)
    expect(clients[0]).toBeInstanceOf(ModelClients)
    expect(clients[0].nom).toBe('Dupont')
  })

  // Test de findbyid()
  it('findbyid() doit renvoyer un client si trouvé', async () => {
    const fakeRow = [{ id_client: 1, nom: 'Dupont', prenom: 'Jean', email: 'jean@example.com', telephone: '0600000000' }]
    configDB.mysqlconnexion.execute.mockResolvedValueOnce([fakeRow])

    const client = await ModelClients.findbyid(1)

    expect(configDB.mysqlconnexion.execute).toHaveBeenCalledWith('SELECT * FROM clients WHERE id_client = ?', [1])
    expect(client).toBeInstanceOf(ModelClients)
    expect(client.nom).toBe('Dupont')
  })

  it('findbyid() doit renvoyer null si aucun client trouvé', async () => {
    configDB.mysqlconnexion.execute.mockResolvedValueOnce([[]])
    const client = await ModelClients.findbyid(999)
    expect(client).toBeNull()
  })

  // Test de create()
  it('create() doit insérer un client', async () => {
    configDB.mysqlconnexion.execute.mockResolvedValueOnce([])

    const data = { nom: 'Martin', prenom: 'Claire', email: 'claire@example.com', telephone: '0622222222' }
    await ModelClients.create(data)

    expect(configDB.mysqlconnexion.execute).toHaveBeenCalledWith(
      'INSERT INTO clients (nom, prenom, email, telephone) VALUES (?, ?, ?, ?)',
      [data.nom, data.prenom, data.email, data.telephone]
    )
  })

  // Test de update()
  it('update() doit modifier un client existant', async () => {
    configDB.mysqlconnexion.execute.mockResolvedValueOnce([])

    const data = { nom: 'Lemoine', prenom: 'Alice', email: 'alice@example.com', telephone: '0633333333' }
    await ModelClients.update(1, data)

    expect(configDB.mysqlconnexion.execute).toHaveBeenCalledWith(
      'UPDATE clients SET nom = ?, prenom = ?, email = ?, telephone = ? WHERE id_client = ?',
      [data.nom, data.prenom, data.email, data.telephone, 1]
    )
  })

  //  Test de delete()
  it('delete() doit supprimer un client', async () => {
    configDB.mysqlconnexion.execute.mockResolvedValueOnce([])

    await ModelClients.delete(1)

    expect(configDB.mysqlconnexion.execute).toHaveBeenCalledWith(
      'DELETE FROM clients WHERE id_client = ?',
      [1]
    )
  })
})
