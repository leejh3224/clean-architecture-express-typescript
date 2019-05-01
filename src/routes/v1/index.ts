import { Router } from 'express';

import booksApi from './books';

const router = Router();

router.use('/books', booksApi);

export default router;
