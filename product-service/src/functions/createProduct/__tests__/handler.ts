import { createProduct } from '../handler';
import { createDbConnection } from "@libs/dbConnection";
import { formatErrorResponse } from "@libs/apiGateway";
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
      const product = JSON.parse(data.body).product

      expect(product).toBeTruthy();
      expect(product.title).toEqual(testProduct.title);

      const pool = createDbConnection()

      return pool.query({
        text: 'DELETE FROM product WHERE id = ${id}',
        values: [product.id]
      })
        .then(() => formatErrorResponse('Product successful deleted', 200))
        .catch(() => formatErrorResponse('Not found', 400))
        .finally(() => pool.end())
    } catch (err) {
		  throw new Error('Product do not exist')
    }
	});
});
