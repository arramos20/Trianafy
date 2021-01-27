import { Router } from 'express';
import { ListController } from '../controllers/list';
import { param, body } from 'express-validator';

const router = Router();

//Comprobar que las listas que muestra son sólo las de ese usuario
router.get('/', UserController.todasLasListas)

router.get('/:id', ListController.listaPorId);

router.put('/:id', ListController.editarCancion);

router.delete('/:id', ListController.eliminarCancion);

export default router;