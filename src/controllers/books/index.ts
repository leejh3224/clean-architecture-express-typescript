import { addBooks, listBooks } from '~/services/books';

import { buildGetBooks } from './get-books';
import { buildPostBooks } from './post-books';

export const getBooks = buildGetBooks({ listBooks });
export const postBooks = buildPostBooks({ addBooks });
