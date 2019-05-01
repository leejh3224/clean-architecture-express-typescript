import { DataTypes, Model, Sequelize } from 'sequelize';

export interface IBookModelAttributes {
	name: string;
}

export const buildBookModel = (sequelize: Sequelize, name: string) => {
	class Book extends Model {}

	Book.init(
		{
			name: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			modelName: name,
		},
	);

	return Book;
};
