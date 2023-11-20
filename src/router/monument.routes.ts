import { Router as createRouter } from 'express';
import { MonumentsController } from '../controllers/controller/monuments.controller';
import createDebug from 'debug';
const debug = createDebug('W7E:tasks:router');
export const monumentsRouter = createRouter();
debug('starting');

const controller = new MonumentsController();

monumentsRouter.get('/', controller.getAll.bind(controller));
monumentsRouter.get('/:id', controller.getById.bind(controller));
monumentsRouter.post('/', controller.create.bind(controller));
monumentsRouter.patch('/:id', controller.update.bind(controller));
monumentsRouter.delete('/:id', controller.delete.bind(controller));
