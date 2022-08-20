import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatErrorResponse, formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { createDbConnection } from "@libs/dbConnection";

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<unknown> = () => {
  const pool = createDbConnection();

  return pool.query('SELECT * FROM product INNER JOIN stocks ON stocks.product_id=product.id ORDER BY product.title')
    .then(({ rows: products }) => {
      return formatJSONResponse({
        products: products.map(({ product_id, ...products }) => products) ,
      })
    })
    .catch(() => {
      return formatErrorResponse('Not found', 400);
    })
    .finally(() => pool.end())
};



export const main = middyfy(getProductsList);
