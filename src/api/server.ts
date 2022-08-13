import express from 'express';
import logger from '../common/logger';
import prettyFormat from '../common/prettyFormat';
import isolateTest from '../core/isolate';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.status(200);
  res.send({ message: `Operational: ${Date.now()}`, status: 'OK' });
});

app.post('/run', (req, res) => {
  logger.info(`Run request:  ${prettyFormat(req.body)}`);
  res.send('Hello World!');
});

export async function start() {
  await isolateTest();

  app.listen(port, () => {
    logger.info(`Listening on port ${port}`);
  });
}
export default app;
