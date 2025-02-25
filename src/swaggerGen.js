import swagger_autogen from 'swagger-autogen';

const swaggerAutogen = swagger_autogen();

const doc = {
	info: {
		title: 'TeorIzmer API',
		description: 'fuckign gps aggregator service for one lab'
	},
	host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
