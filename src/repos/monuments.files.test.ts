import { Monument } from '../entities/entities.js';
import { HttpError } from '../types/http.error';
import { MonumentsFileRepo } from './monuments.file.repo';
import fs from 'fs/promises';

jest.mock('fs/promises');

describe('Given MonumentsFileRepo class', () => {
  describe('When we instantiate it', () => {
    const mockData = '[{"id": "1", "name": "Test"}]';
    fs.readFile = jest.fn().mockResolvedValue(mockData);
    fs.writeFile = jest.fn();

    const repo = new MonumentsFileRepo();
    const mockId = '1';
    test('Then getAll should return the list of monuments', async () => {
      const result = await repo.getAll();
      expect(result).toStrictEqual(JSON.parse(mockData));
    });
    test('Then getById should return the monument with the specified id', async () => {
      const result = await repo.getById(mockId);
      const expectedFilm = JSON.parse(mockData).find(
        (monument: Monument) => monument.id === mockId
      );
      expect(result).toEqual(expectedFilm);
    });
    test('Then create should add a new monument and return it', async () => {
      const mockData = '[]';
      const mockName = 'Trajan Arc';
      fs.readFile = jest.fn().mockResolvedValue(mockData);
      const repo = new MonumentsFileRepo();

      const newMonument = { name: mockName } as Omit<Monument, 'id'>;
      const result = await repo.create(newMonument);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name', mockName);

      const updatedData = await repo.getAll();
      expect(updatedData).toHaveLength(1);
      expect(updatedData[0]).toEqual(result);
    });
    test('Then update should modify an existing monument and return it', async () => {
      const mockName = 'Roman Theatre';
      const updatedMonument = { name: mockName };
      const result = await repo.update(mockId, updatedMonument);

      const expectedMonument = { id: mockId, name: mockName };
      const updatedData = await repo.getAll();

      expect(result).toEqual(expectedMonument);
      expect(updatedData).toHaveLength(1);
      expect(updatedData[0]).toEqual(result);
    });
    test('Then delete should remove an existing monument', async () => {
      await repo.delete(mockId);
      const updatedData = await repo.getAll();
      expect(updatedData).toHaveLength(0);
    });
    test('Then delete should throw HttpError for non-existent id', async () => {
      const nonExistentId = 'non-existent-id';
      await expect(repo.delete(nonExistentId)).rejects.toThrow(HttpError);
    });
  });
});
