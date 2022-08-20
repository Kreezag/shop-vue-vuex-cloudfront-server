import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatErrorResponse, formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { createDbConnection } from "@libs/dbConnection";

export const getProductById: ValidatedEventAPIGatewayProxyEvent<
	typeof schema
> = event => {
	if (!event?.pathParameters?.id) {
    return Promise.resolve()
      .then(() => {
        return formatErrorResponse('Not Found', 404)
      })
	}

	const id: string = event.pathParameters.id;

  const pool = createDbConnection();

  return pool.query({
    text: 'SELECT * FROM product INNER JOIN stocks ON product.id=stocks.product_id where id = $1',
    values: [id],
  })
    .then(({ rows: products }) => {
      const product = products.map(({ product_id, ...product}) => product)[0];

      if (!product) {
        return formatErrorResponse('Not Found', 404);
      }

      return formatJSONResponse({ product })
    })
    .catch(() => {
      return formatErrorResponse('Not Found', 404);
    })
    .finally(() => pool.end())
};

export const main = middyfy(getProductById);
