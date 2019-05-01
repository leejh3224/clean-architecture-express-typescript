import { buildBooksDB, IBooksDB } from '~/data-access/books';
import { DB } from '~/db';
import { buildListBooks, IListBooks } from './list-books';

describe('list-books', () => {
	let db: DB;
	let booksDB: IBooksDB;
	let listBooks: IListBooks;

	beforeEach(async () => {
		db = new DB();
		await db.init({ willLoadFixtures: false });
		booksDB = buildBooksDB({ db: db.models.Book! });
		listBooks = buildListBooks({ booksDB });
	});

	afterEach(async () => {
		await db.clearTable({ name: 'Book' });
	});

	afterAll(async () => {
		await db.stop();
	});

	it('returns books when no parameters are given', async () => {
		await booksDB.create({ name: 'book1 ' });
		const books = await listBooks();

		expect(books).toHaveLength(1);
	});
});
