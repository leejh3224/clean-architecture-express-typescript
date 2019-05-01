# SimpleBookReader

## About

- Uncle Bob's clean architecture implementation in express/typescript/jest/sequelize

## Features

- get/post books
- basic data validation via `@hapi/Joi`
- sequelize fixtures enabled
- basic jest test cases for data-access/services
- typescript configuration

## Getting Started

1. Install `Mysql` and start `Mysql.server`.
2. Create database `simple-book-reader` for development and \
  `simple-book-reader-test` for test
3. `npm install`
4. `npm run dev`
5. For test, run `npm test`

## Folder Structure

- Controllers:
  Unlike huge and mighty typical express.js controllers, controllers focus \
  on returning response object for given custom request object(`IHttpRequest`).

- Data-access:
  Instead of directly using `sequelize` model methods, `data-access` wraps those api thus \
  provides proper abstractions over the framework.

- Errors:
  Generally, typical web application needs to handle two kinds of errors, one is 5XX error and \
  the other is 4XX error. So for 5XX errors, use native js `Error` and for 4XX errors, use `ClientError`.

- Model-validations:
  This is the place where the business logic of each entity resides. It validates given data with `Joi` schema.\
  It throws `ClientError` when data is invalid and returns `getter` methods for each field instead of returning data object directly.\
  This makes `service` code more resilient to changes in entities structure.

- Model:
  Place for `sequelize` model definition however you can use whatever `ORM` or database client you like.
  It should work regardless of your selection of framework/library.

- Routes:
  It contains definition for each routes. For each route handlers, it must be wrapped with `buildExpressCallback` helper.
  Thus making our controller simple, dumb and not knowing which routing framework you're using.

- Services:
  It handles validations via `models-validation` and use `data-access` to interact with database.

## Reference

This repository is heavily inspired by [dev-master](https://github.com/dev-mastery) and [his repo - comments api](https://github.com/dev-mastery/comments-api).