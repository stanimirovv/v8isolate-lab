import express from 'express';
import config from '../../common/config';
import { AuthorizationError } from '../../common/error.list';
import logger from '../../common/logger';
import prettyFormat from '../../common/prettyFormat';
import Authorize from '../../core/authenticate';

export default function addIsolateRoutes(app: express.Express) {
  app.post('/isolate', (req: express.Request, res: express.Response) => {
    console.log(req.header('Authorization'));

    const token = extractAuthTokenFromHeaders(req.headers as any);
    if (!Authorize.isAuthorized(token, config.testKey)) {
      throw new AuthorizationError();
    }

    logger.info(`Run request:  ${prettyFormat(req.body)}`);
    res.status(201);
    res.send('Hello World!');
  });

  // app.get('/isolate', (req, res) => {
  //   logger.info(`Run request:  ${prettyFormat(req.body)}`);
  //   res.send('Hello World!');
  // });

  // app.post('/isolate:run', (req, res) => {
  //   logger.info(`Run request:  ${prettyFormat(req.body)}`);
  //   res.send('Hello World!');
  // });
}

const extractAuthTokenFromHeaders = (headers: Record<string, string>) => {
  const authHeader = headers['authorization'];
  const chunks = authHeader.split(' ');
  if (chunks.length !== 2) {
    logger.error(`Malformed auth header: ${authHeader}`);
    throw new AuthorizationError();
  }

  logger.info(`Returning token: ${chunks[1]}`);
  return chunks[1];
};
