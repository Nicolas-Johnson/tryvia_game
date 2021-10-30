// import tudo
const { createServer } = require('http');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

const defaultP = 5000;
const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || defaultP);

const app = express(); // function que define a apliação express. extancia express e salva em app.
const dev = app.get('env') !== 'production'; // get envirioment from app se estivermos em teste ou em development enviroment.

if (!dev) { // se tivermos em production precisamos fazer isso.
  app.disable('x-powered-by'); // remove isso.
  app.use(compression()); // em production use the compression module
  app.use(morgan('common')); // use morgan com a flag common

  app.use(express.static(path.resolve(__dirname, 'build'))); // explica como lidar com as arotas em caso de react-router estiver em uso.

  app.use('*', (req, res) => { // explica que em todos as requestes que entrarem
    res.sendFile(path.resolve(__dirname, 'build', 'index.html')); // envie o arquivo index html como response (em caso de single page aplcation sem api)
  });
}
// para o ldo  produção é isso

if (dev) {
  app.use(morgan('dev'));
}

const server = createServer(app);

server.listen(PORT, (err) => {
  if (err) throw err;

  console.log('Server starter VQV!');
});
