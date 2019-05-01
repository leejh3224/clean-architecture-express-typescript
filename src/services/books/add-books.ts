import { IBooksDB } from '~/data-access/books';
import { validateBook } from '~/model-validations/book';
import { IBookModelAttributes } from '~/models/book';

export type IAddBooks = (body: IBookModelAttributes) => Promise<any>;

export const buildAddBooks = ({
	booksDB,
}: {
	booksDB: IBooksDB;
}): IAddBooks => {
	return async body => {
		const bookData = validateBook(body);
		return booksDB.create({
			name: bookData.getName(),
		});
	};
};
