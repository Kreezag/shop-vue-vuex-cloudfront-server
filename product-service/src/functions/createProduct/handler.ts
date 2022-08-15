import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatErrorResponse, formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from "@functions/getProductById/schema";
import { createDbConnection } from "@libs/dbConnection";

type Product = {
  title?: string;
  price: number;
  description?: string;
  count?: number;
};

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

  const { title, price = 0, description = '', count = 0 } = product as Product;

  console.log('product', title, price, description)

  const pool = createDbConnection();

  return pool.connect()
    .then((client) => {
      return client.query('BEGIN')
        .then(() => client.query({
          text: 'INSERT INTO product (title, price, description) VALUES ($1, $2, $3) RETURNING id',
          values: [title, price, description]
        })
          .then(({ rows }) => {
            if (!rows[0]) {
              return new Error('Product do not create')
            }

            return rows[0].id
          })
          .then((product_id) => {
            console.log('product_id', product_id)
            return client.query({
              text: 'INSERT INTO stocks (product_id, count) VALUES ($1, $2)',
              values: [product_id, count]
            })
          })
          .then((res) => {
            console.log('COMMIT', res)
            return client.query('COMMIT')
          })
          .catch((res) => {
            console.log('ROLLBACK', res)
            return client.query('ROLLBACK')
          })
          .catch((err) => {
            console.error('Catch Error:', err)

            return client.query('ROLLBACK').finally(() => {
              return formatErrorResponse('Product is invalid', 400)
            })
          })
          .then((res) => {
            console.log('products[0]', res)
            return formatJSONResponse({ product: { title: 'Hi' } })
          })
          .finally(() => {
              console.info('FINALLY')
              client.release()
            })
        )

    })
    .catch(() => {
      return formatErrorResponse('Product is invalid', 400)
    })
};



export const main = middyfy(createProduct);
