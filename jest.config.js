// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
module.exports = {
	coverageDirectory: 'coverage',
	moduleDirectories: ['node_modules', 'src'],
	setupFilesAfterEnv: ['jest-extended'],
	moduleNameMapper: {
		'~/(.*)': '<rootDir>/src/$1',
	},
	testEnvironment: 'node',
	watchPathIgnorePatterns: [
		'<rootDir>/config/*',
		'<rootDir>/(.*).config.js',
		'<rootDir>/(.*).json',
	],
};
