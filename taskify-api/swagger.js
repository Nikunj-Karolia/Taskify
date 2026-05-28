const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Taskify Api',
      version: '1.0.0',
      description: 'A simple Task generation API',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  // Path to the API docs (files containing @swagger comments)
  apis: ['./router/*.js'], 
};

module.exports = swaggerJsDoc(options);