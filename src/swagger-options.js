exports.options = {
    routePrefix: '/docs',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'Educational platform api',
        description: 'API для платформы онлайн-обучения',
        version: '1.0.0',
      },
    //   externalDocs: {
    //     url: 'https://swagger.io',
    //     description: 'Find more info here',
    //   },
      host: 'localhost:1337',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  };