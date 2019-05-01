import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { Controller, IControllerResponse } from '~/controllers';

import { ClientError } from '~/errors/clientError';
import { logger } from './logger';

export interface IHttpRequest {
	body: Request['body'];
	query: Request['query'];
	params: Request['params'];
}

export const buildExpressCallback = (controller: Controller) => {
	return async (req: Request, res: Response) => {
		try {
			const httpRequest = {
				body: req.body,
				query: req.query,
				params: req.params,
			};
			const httpResponse: IControllerResponse = await controller(httpRequest);

			res.json(httpResponse.body);
		} catch (error) {
			logger.log(error);

			const errorMessage =
				error instanceof ClientError ? error.message : '서버 오류입니다.';

			res.json({
				success: false,
				statusCode: INTERNAL_SERVER_ERROR,
				body: {
					error: errorMessage,
				},
			});
		}
	};
};
