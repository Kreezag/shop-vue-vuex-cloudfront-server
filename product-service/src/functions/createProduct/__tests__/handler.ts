import { createProduct } from '../handler';

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

	it('pathParameters.id is not actual ', async () => {
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
				pathParameters: { id: 'randomId' },
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

	it('pathParameters.id is actual', async () => {
	  const testId = '23917ffa-64a4-4327-85b0-a56ec95fc0b9';

		const data = await createProduct(
			{
				body: { title: testId },
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
		);

		expect(data).toBeTruthy();
		expect(data).toEqual({
			body: JSON.stringify({ message: 'Not Found' }),
			statusCode: 200,
			headers: headersMock,
		});
	});
});
