import { Request, Response } from 'express';
import { MonumentsController } from './monuments.controller';
import { MonumentsFileRepo } from '../../repos/monuments.file.repo';

describe('Given FilmsController class', () => {
  describe('When we instantiate it', () => {
    const mockData = [{}];
    MonumentsFileRepo.prototype.getAll = jest.fn().mockResolvedValue(mockData);

    const controller = new MonumentsController();

    const mockRequest: Request = {
      body: {},
    } as Request;

    const mockResponse: Response = {
      json: jest.fn(),
    } as unknown as Response;

    test('Then getAll should...', async () => {
      await controller.getAll(mockRequest, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith(mockData);
    });
  });
});
