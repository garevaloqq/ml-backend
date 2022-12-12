import { Router } from 'express';
import controller from '../controllers/Items';

const router = Router();

router.get('/:id', controller.getProduct);
router.get('/', controller.searchProducts);

export = router;
