import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatErrorResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from "@functions/getProductById/schema";

export const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = (e) => {
  if (!e?.body) {
    return Promise.resolve()
      .then(() => {
        return formatErrorResponse('Not Found', 404)
      })
  }
  const { product } = e.body;


  if (!product) {
    return Promise.resolve()
      .then(() => {
        return formatErrorResponse('Not Found', 404)
      })
  }

  return Promise.resolve()
    .then(() => {
      return formatErrorResponse('Not Found', 404)
    })
};



export const main = middyfy(createProduct);
