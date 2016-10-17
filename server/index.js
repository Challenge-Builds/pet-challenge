'use strict';

const path = require('path');
if (!process.env.EB_NODE_COMMAND) {
    require('node-env-file')(path.join(__dirname, '.env'));
}

const hapi = require('hapi');
const port = process.env.PORT;
const server = new hapi.Server();

server.connection({
    port: port,
    routes: {
        cors: {
            origin: ['*']
        }
    }
});

server.method(require('./methods').methods);
server.route(require('./routes').routes);


server.start((err) => {
        if (err) {
            console.log(err.message);
            console.log(err.reason);
            console.log(err.stack);
        } else {
            console.info('Listening on port ' + port);
        }
});