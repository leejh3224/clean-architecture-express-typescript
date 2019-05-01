import { ValidationErrorItem } from '@hapi/joi';
import { ClientError } from '~/errors/clientError';

export const handleValidationError = ([
	validationError,
]: ValidationErrorItem[]) => {
	switch (validationError.type) {
		case 'object.allowUnknown': {
			throw new ClientError('허용되지 않은 필드가 포함되어 있습니다.');
		}

		case 'object.child': {
			// just show first validation error only
			const { type, context } = validationError.context!.reason[0];

			switch (type) {
				case 'any.empty':
					throw new ClientError(`${context.label}이/가 비어있습니다.`);

				case 'any.required':
					throw new ClientError(`${context.label}이/가 필요합니다.`);

				case 'string.min':
					throw new ClientError(
						`${context.label}은/는 최소 ${context.limit}자 이상이어야 합니다.`,
					);

				case 'string.max':
					throw new ClientError(
						`${context.label}은/는 최대 ${context.limit}까지 허용됩니다.`,
					);

				/**
				 * All possible error messages:
				 * https://github.com/hapijs/joi/blob/v15.0.1/lib/language.js
				 */
				default:
					throw new Error('처리되지 않은 validation 에러입니다.');
			}
		}

		default:
			throw new Error('처리되지 않은 validation 에러입니다.');
	}
};
