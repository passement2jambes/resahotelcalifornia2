import { describe, it, expect } from 'vitest';
import ModelChambres from '../models/modelChambres.js';
import connexion from '../../config/connexion.js';

vi.mock('../../config/connexion'); // Mock du module connexion

describe('tests sur le modele chambre', () => {

    beforeEach(() => {
        vi.clearAllMocks(); // Réinitialiser les mocks avant chaque test
    });

    it('doit retourner un tableau d’objets ModelChambres', async () => {
        const mockRows = [
            { id: 1, numero : 101, capacite : 3, disponibilite : false },
            { id: 2, numero : 102, capacite : 5, disponibilite : true }
        ];

        connexion.execute.mockResolvedValue([mockRows]); // Mock de la réponse de la base de données

        const result = await ModelChambres.findall();

        expect(connexion.execute).toHaveBeenCalledWith('SELECT * FROM chambres');
        expect(result).toHaveLength(mockRows.length);
        expect(result[0]).toBeInstanceOf(ModelChambres);
        expect(result[0].numero).toBe(101);
        expect(result[1].capacite).toBe(5);
    });

    it ('doit retourner une chambre par son id', async () => {
        const mockRow = { id: 1, numero : 101, capacite : 3, disponibilite : false };

        connexion.execute.mockResolvedValue([[mockRow]]); // Mock de la réponse de la base de données

        const result = await ModelChambres.findbyid(1);

        expect(connexion.execute).toHaveBeenCalledWith('SELECT * FROM chambres WHERE idChambre = ?', [1]);
        expect(result).toBeInstanceOf(ModelChambres);
        expect(result.numero).toBe(101);
        expect(result.capacite).toBe(3);
    });

    it ('doit créer une nouvelle chambre et retourner son id', async () => {
