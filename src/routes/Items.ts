import { Router } from 'express';
import controller from '../controllers/Items';

const router = Router();

router.get('/:id', controller.getOne);
router.get('/', controller.search);

export = router;
