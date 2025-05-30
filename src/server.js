require('dotenv').config();

const { server, restify } = require('./app');
const loader = require('./loader');
const mongoose = require('./database');
const { errorHandler, notFoundHandler} = require('./middleware/error.handler')

const PORT = process.env.PORT || 3000;

mongoose();

// ✅ Preload all controllers
loader();

// Serve static files from Frontend dist folder
server.get(
  '/*',
  restify.plugins.serveStatic({
    directory: './dist',
    default: 'index.html',
    appendRequestPath: true,
    setHeaders: (res, path) => {
      let contentType = 'text/html';

      if (path.endsWith('.js')) contentType = 'application/javascript'
      if (path.endsWith('.css')) contentType = 'text/css'
      if (path.endsWith('.png')) contentType = 'image/png';
      if (path.endsWith('.jpg') || path.endsWith('.jpeg')) contentType = 'image/jpeg';
      if (path.endsWith('.webp')) contentType = 'image/webp';
      if (path.endsWith('.svg')) contentType = 'image/svg+xml';

      res.setHeader('Content-Type', contentType)
    },
  })
);

// Handle restify errors
server.on('ServerError', errorHandler);
server.on('NotFound', notFoundHandler);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Restify server running at http://localhost:${PORT}`);
});
