import { Request, Response } from 'express';

import { MonumentsFileRepo } from '../../repos/monuments.file.repo';

import { MonumentsController } from './monuments.controller';

describe('Given MonumentsController class', () => {
  describe('When we instantiate it', () => {
    test('Then getAll should ...', async () => {
      MonumentsFileRepo.prototype.getAll = jest.fn().mockResolvedValue([{}]);

      const controller = new MonumentsController();

      const mockRequest: Request = {
        body: {},
      } as Request;

      const mockResponse: Response = {
        json: jest.fn(),
      } as unknown as Response;

      await controller.getAll(mockRequest, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith([{}]);
    });

    test('Then getById should...', async () => {
      const mockRequest: Request = { params: { id: 1 } } as unknown as Request;
      const mockResponse: Response = { json: jest.fn() } as unknown as Response;
      const next = jest.fn();

      const monumentController = new MonumentsController();

      monumentController.repo.getById = jest
        .fn()
        .mockResolvedValue({ id: 1, name: 'Monument' });

      await monumentController.getById(mockRequest, mockResponse, next);
      expect(monumentController.repo.getById).toHaveBeenCalledWith(1);
      // Ajustar el valor esperado para reflejar la respuesta real del método getById
      expect(mockResponse.json).toHaveBeenCalledWith({
        id: 1,
        name: 'Monument',
      });
    });

    test('Then create should...', async () => {
      const monumentController = new MonumentsController();
      const req = {
        body: {},
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        statusMessage: '',
        json: jest.fn(),
      } as unknown as Response;
      await monumentController.create(req, res);
      expect(res.json).toHaveBeenCalled(/* expected result */);
    });

    test('The should update a monument...', async () => {
      const monumentController = new MonumentsController();
      const req = {
        params: { id: '1' },
        body: { name: 'Updated Monument' },
      } as unknown as Request;
      const res = {
        json: jest.fn(),
      } as unknown as Response;
      monumentController.repo.update = jest
        .fn()
        .mockResolvedValue({ id: 1, name: 'Updated Monument' });
      await monumentController.update(req, res);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        name: 'Updated Monument',
      });
    });
  });
});
