import express from 'express';
import rateLimit from 'express-rate-limit';
import config from '../common/config';
import { AuthorizationError, ValidationError } from '../common/error.list';
import logger from '../common/logger';
import { initializeDb } from '../db/index';
import addIsolateRoutes from './routes/isolate';
import addProfileRoutes from './routes/profile';

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply the rate limiting middleware to all requests

const app = express();
app.use(limiter);
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
    logger.error(`Caught error: ${err.toString()}`);
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
  await initializeDb();
  app.listen(port, () => {
    logger.info(`Listening on port ${port}`);
  });
}
export default app;
