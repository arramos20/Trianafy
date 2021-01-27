import { Router } from 'express';
import { SongController } from '../controllers/songs';
import { param, body } from 'express-validator';

const router = Router();

router.get('/:id', SongController);

router.put('/:id', SongController.editarCancion);

router.delete('/:id', SongController.eliminarCancion);

export default router;