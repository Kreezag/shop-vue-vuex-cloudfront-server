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

type Stock = {
  product_id: string;
  count: string
}

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

  const pool = createDbConnection();

  let newProduct: Product|null = null;
  let newStock: Stock|null = null;

  return pool.connect()
    .then((client) => {
      return client.query('BEGIN')
        .then(() => {
            return client.query({
              text: 'INSERT INTO product (title, price, description) VALUES ($1, $2, $3) RETURNING *',
              values: [ title, price, description ]
            })
              .then(({ rows }) => {
                if (!rows[0]) {
                  throw new Error('Product do not create')
                }

                newProduct = rows[0]

                return rows[0].id
              })
              .then((product_id) => client.query({
                  text: 'INSERT INTO stocks (product_id, count) VALUES ($1, $2) RETURNING *',
                  values: [ product_id, count ]
                })
              )
              .then(({ rows }) => {
                newStock = rows[0];

                return client.query('COMMIT')
              })
              .catch(() => client.query('ROLLBACK'))
              .then(() => {
                const product = {
                  ...newProduct,
                  stock: newStock.count
                }
                return formatJSONResponse({ product })
              })
              .catch(() => formatErrorResponse('Not Found', 404))
              .finally(() => {
                newProduct = null
                newStock = null
                console.info('FINALLY')
                client.release()
              });
          }
        )
    })
    .catch(() => {
      return formatErrorResponse('Product is invalid', 400)
    })
    .finally(() => pool.end())
};



export const main = middyfy(createProduct);
