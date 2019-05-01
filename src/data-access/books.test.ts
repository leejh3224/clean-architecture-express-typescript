import { DB } from '~/db';
import { buildBooksDB, IBooksDB } from './books';

describe('data-access:books', () => {
	let db: DB;
	let booksDB: IBooksDB;

	beforeEach(async () => {
		db = new DB();
		await db.init({ willLoadFixtures: false });
		booksDB = buildBooksDB({ db: db.models.Book! });
	});

	afterEach(async () => {
		await db.clearTable({ name: 'Book' });
	});

	afterAll(async () => {
		await db.stop();
	});

	describe('findAll', () => {
		it('returns books when no parameters are given', async () => {
			await booksDB.create({
				name: 'book1',
			});

			const books = await booksDB.findAll();

			expect(books).toHaveLength(1);
		});
	});

	describe('create', () => {
		it('returns created book when valid data is given', async () => {
			const book = await booksDB.create({
				name: 'book1',
			});

			expect(book).not.toBeEmpty();
		});
	});
});
