const doc = {
    info: {
        title: 'My API',
        description: 'World Cup API'
    },
    host: 'localhost:3000'
};

const outputfile = './swagger.json';
const routes = ['./server.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */
swaggerAutogen(outputFile, routes, doc);
