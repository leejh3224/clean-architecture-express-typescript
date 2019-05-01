import { IBooksDB } from '~/data-access/books';

export type IListBooks = () => Promise<any>;

export const buildListBooks = ({
	booksDB,
}: {
	booksDB: IBooksDB;
}): IListBooks => {
	return async () => {
		return booksDB.findAll();
	};
};
