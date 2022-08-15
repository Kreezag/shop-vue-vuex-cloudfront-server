import { createProduct } from '../handler';
import { createDbConnection } from "@libs/dbConnection";
import { formatErrorResponse, formatJSONResponse } from "@libs/apiGateway";
import { APIGatewayProxyResult } from "aws-lambda";

const headersMock = {
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'OPTIONS,GET',
};

describe('test for createProduct', () => {
	it('without params', async () => {
		const data = await createProduct(null, null, null);

		expect(data).toBeTruthy();
		expect(data).toEqual({
			body: JSON.stringify({ message: 'Not Found' }),
			statusCode: 404,
			headers: headersMock,
		});
	});

	it('pathParameters', async () => {
		const data = await createProduct(
			{
				body: undefined,
				headers: undefined,
				httpMethod: '',
				isBase64Encoded: false,
				multiValueHeaders: undefined,
				multiValueQueryStringParameters: undefined,
				path: '',
				queryStringParameters: undefined,
				requestContext: undefined,
				resource: '',
				stageVariables: undefined,
				pathParameters: {},
			},
			null,
			null
		);

		expect(data).toBeTruthy();
		expect(data).toEqual({
			body: JSON.stringify({ message: 'Not Found' }),
			statusCode: 404,
			headers: headersMock,
		});
	});

	it('empty pathParameters.id', async () => {
		const data = await createProduct(
			{
				body: undefined,
				headers: undefined,
				httpMethod: '',
				isBase64Encoded: false,
				multiValueHeaders: undefined,
				multiValueQueryStringParameters: undefined,
				path: '',
				queryStringParameters: undefined,
				requestContext: undefined,
				resource: '',
				stageVariables: undefined,
				pathParameters: { id: '' },
			},
			null,
			null
		);

		expect(data).toBeTruthy();
		expect(data).toEqual({
			body: JSON.stringify({ message: 'Not Found' }),
			statusCode: 404,
			headers: headersMock,
		});
	});

	it('body.product is actual', async () => {
	  const testProduct = {
      title: "Test product",
      price: 20,
      description: "Test product for creation product lambda",
      count: 7,
    };

		const data = await createProduct(
			{
				body: {
				  product: testProduct,
        },
				headers: undefined,
				httpMethod: '',
				isBase64Encoded: false,
				multiValueHeaders: undefined,
				multiValueQueryStringParameters: undefined,
				path: '',
				queryStringParameters: undefined,
				requestContext: undefined,
				resource: '',
				stageVariables: undefined,
				pathParameters: undefined,
			},
			null,
			null
		) as APIGatewayProxyResult;

		expect(data).toBeTruthy();
		expect(data.statusCode).toEqual(200)
		expect(data.headers).toEqual(headersMock)
    try {
      const products = JSON.parse(data.body).products

      expect(products).toBeTruthy();
      expect(products.title).toEqual(testProduct.title);

      await new Promise(() => {
        const pool = createDbConnection()
        const deleteProductQuery = `DELETE FROM product WHERE id = ${products.id}`

        return pool.query(deleteProductQuery)
          .then(({ rows: products }) => {
            return formatJSONResponse({
              products: products.map(({ product_id, ...products }) => products) ,
            })
          })
          .catch(() => {
            return formatErrorResponse('Not found', 400);
          })
      })
    } catch {
		  throw new Error('Product do not exist')
    }
	});
});
