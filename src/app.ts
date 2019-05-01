import bodyParser from 'body-parser';
import config from 'config';
import express from 'express';
import { db } from '~/db';
import { logger } from '~/helpers/logger';
import apiV1 from '~/routes/v1';

class Server {
	app = express();
	port = 3000 || config.get('port');

	applyMiddlewares() {
		this.app.use(bodyParser.json());
		this.app.use('/v1', apiV1);
	}

	start() {
		this.applyMiddlewares();

		this.app.listen(this.port, async () => {
			logger.log(`listening to port:${this.port}`);
			await db.init({ willLoadFixtures: true });
		});
	}
}

export const server = new Server();
