const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const express = require('express')
const app = express(    )

const routes = require('./routes/index.js')

app.use(express.json());
app.use('/', routes)
app.use('/worldCupChampions', routes);
app.use('/api-docs', swaggerUI.setup(swaggerDocument));

const port = process.env.PORT || 3000;

app.listen(process.env.PORT || port);
console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
