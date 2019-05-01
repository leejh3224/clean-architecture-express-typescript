import { OK } from 'http-status-codes';
import { IHttpRequest } from '~/helpers/express-callback';
import { IListBooks } from '~/services/books/list-books';

import { IControllerResponse } from '..';

export const buildGetBooks = ({ listBooks }: { listBooks: IListBooks }) => {
	return async (
		request: Partial<IHttpRequest>,
	): Promise<IControllerResponse> => {
		const books = await listBooks();

		return {
			success: true,
			statusCode: OK,
			body: books,
		};
	};
};
