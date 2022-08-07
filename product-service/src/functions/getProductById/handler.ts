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
		return formatErrorResponse('Product ID is not defined', 400);
	}

  const connection = createDbConnection()

  return Promise.all([
    connection.query('select * from product where id = $1', event.pathParameters.id),
    connection.query('select * from store where id = $1', event.pathParameters.id),
  ]).then(([product, stock]) => {
    return formatJSONResponse({
      products: {
        ...product,
        count: stock.count
      },
    });
  })
};

export const main = middyfy(getProductById);
