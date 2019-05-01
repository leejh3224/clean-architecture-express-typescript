import { ModelInstance } from '~/db';
import { IBookModelAttributes } from '~/models/book';

export interface IBooksDB {
	findAll: () => Promise<ModelInstance[]>;
	create: (data: IBookModelAttributes) => Promise<ModelInstance>;
}

export const buildBooksDB = ({
	db,
}: {
	db: typeof ModelInstance;
}): IBooksDB => {
	const findAll = async () => {
		return db.findAll();
	};

	const create = async (data: IBookModelAttributes) => {
		return db.create(data);
	};

	return {
		findAll,
		create,
	};
};
