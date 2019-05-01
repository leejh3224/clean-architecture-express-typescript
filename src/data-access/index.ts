import { db } from '~/db';

import { buildBooksDB } from './books';

export const booksDB = buildBooksDB({ db: db.models.Book! });
