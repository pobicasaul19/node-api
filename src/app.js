const restify = require('restify');

// Create singleton Restify server
const server = restify.createServer({
  maxParamLength: 1000,
});

// Middleware to parse body and cookies
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// Export as a singleton
module.exports = {
  server,
  restify
};
