import express from 'express';
import logger from './common/logger';
const app = express();
const port = 3000;

export function start() {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    logger.info(`Listening on port ${port}`);
  });
}
