import { booksDB } from '~/data-access';

import { buildAddBooks } from './add-books';
import { buildListBooks } from './list-books';

export const listBooks = buildListBooks({ booksDB });
export const addBooks = buildAddBooks({ booksDB });
