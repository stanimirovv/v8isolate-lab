import express from 'express';
import config from '../common/config';
import { AuthorizationError, ValidationError } from '../common/error.list';
import logger from '../common/logger';
import prettyFormat from '../common/prettyFormat';
import isolateTest from '../core/isolate';
import { initializeDb } from '../db/index';
import addIsolateRoutes from './routes/isolate';
import addProfileRoutes from './routes/profile';

const app = express();
app.use(express.json());

const port = config.servicePort;
app.get('/', (req, res) => {
  res.status(200);
  res.send({ message: `Operational: ${Date.now()}`, status: 'OK' });
});

addIsolateRoutes(app);
addProfileRoutes(app);

// Error handler
app.use(
  (err: Error, req: express.Request, res: express.Response, next: Function) => {
    logger.error(`Caught error: ${prettyFormat(err)}`);
    if (err instanceof AuthorizationError) {
      res.status(403).send('Authorization error');
    } else if (err instanceof ValidationError) {
      res.status(422).send('Validation Error');
    } else {
      res.status(500).send('Internal error');
    }

    return next();
  },
);

export async function start() {
  await isolateTest();
  await initializeDb();
  app.listen(port, () => {
    logger.info(`Listening on port ${port}`);
  });
}
export default app;
