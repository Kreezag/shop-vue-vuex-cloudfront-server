import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { createDbConnection } from "@libs/dbConnection";

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<unknown> = () => {
  const connection = createDbConnection()

  return Promise.all([
    connection.query('select * from product' ),
    connection.query('select * from store' ),
  ]).then(([products, stocks]) => {
    const result = products.map((product) => {
      const count = stocks.find((stock) => stock.id === product.id)

      return {
        ...product,
        count
      }
    })

    return formatJSONResponse({
      products: result,
    });
  })
};


export const main = middyfy(getProductsList);
