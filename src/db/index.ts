import config from 'config';
import { Model, Sequelize } from 'sequelize';
import sequelizeFixtures from 'sequelize-fixtures';
import { logger } from '~/helpers/logger';
import { buildBookModel } from '~/models/book';

type modelNames = 'Book';

// Generic sequelize instance type
export class ModelInstance extends Model {}

interface IModelBuilder {
	name: modelNames;
	builder: (sequelize: Sequelize, name: modelNames) => typeof ModelInstance;
}

// tslint:disable-next-line: max-classes-per-file
export class DB {
	models: Partial<{ [name in modelNames]: typeof ModelInstance }> = {};
	dbConfig = config.get('sequelize');
	sequelize = new Sequelize(this.dbConfig);
	modelBuilders: IModelBuilder[] = [
		{
			name: 'Book',
			builder: buildBookModel,
		},
	];

	constructor() {
		this.addModels();
	}

	addModels() {
		this.modelBuilders.forEach(({ name, builder }) => {
			const model = builder(this.sequelize, name);
			this.models[name] = model;
		});
	}

	loadFixtures() {
		sequelizeFixtures.loadFile('src/db/fixtures/books.json', this.models);
	}

	async clearTable({ name }: { name: modelNames }) {
		if (!this.models[name]) {
			throw new Error('no such table!');
		}

		await this.models[name]!.destroy({
			where: {},
			truncate: true,
		});
	}

	async stop() {
		return this.sequelize.close();
	}

	async init({ willLoadFixtures = true }: { willLoadFixtures: boolean }) {
		const isDev = process.env.NODE_ENV === 'development';

		try {
			await this.sequelize.sync({
				force: isDev,
			});

			if (willLoadFixtures) {
				this.loadFixtures();
			}

			if (isDev) {
				logger.log('db is connected');
			}
		} catch (error) {
			if (isDev) {
				logger.log(error);
			}
		}
	}
}

export const db = new DB();
