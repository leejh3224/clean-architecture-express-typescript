import { Router } from 'express';
import { getBooks, postBooks } from '~/controllers/books';
import { buildExpressCallback } from '~/helpers/express-callback';

const router = Router();

router.get('/', buildExpressCallback(getBooks));
router.post('/', buildExpressCallback(postBooks));

export default router;
