import { OK } from 'http-status-codes';
import { IHttpRequest } from '~/helpers/express-callback';
import { IAddBooks } from '~/services/books/add-books';

import { IControllerResponse } from '..';

export const buildPostBooks = ({ addBooks }: { addBooks: IAddBooks }) => {
	return async (
		request: Partial<IHttpRequest>,
	): Promise<IControllerResponse> => {
		const book = await addBooks(request.body);

		return {
			success: true,
			statusCode: OK,
			body: {
				book,
			},
		};
	};
};
