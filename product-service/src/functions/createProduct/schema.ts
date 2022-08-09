export default {
	type: 'object',
	properties: {
    body: {
      type: 'object',
      properties: {
        title: 'string'
      }
    },
	},
  required: ['body']
} as const;
