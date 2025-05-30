const fs = require('fs');
const path = require('path');

// Auto-load all controllers from /controllers
const loadControllers = () => {
  const controllerPath = path.join(process.cwd(), 'src/controllers');
  fs.readdirSync(controllerPath).forEach((file) => {
    if (file.endsWith('.js')) {
      console.log(`✅ Loading controller: ${file}`);
      require(path.join(controllerPath, file));
    }
  });
};

module.exports = loadControllers;