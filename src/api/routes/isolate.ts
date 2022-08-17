import express from 'express';
import config from '../../common/config';
import { AuthorizationError } from '../../common/error.list';
import logger from '../../common/logger';
import prettyFormat from '../../common/prettyFormat';
import Authorize from '../../core/authenticate';
import { Isolate } from '../../core/isolate';

export default function addIsolateRoutes(app: express.Express) {
  app.post(
    '/isolate',
    async (req: express.Request, res: express.Response, next: Function) => {
      try {
        const token = extractAuthTokenFromHeaders(req.headers as any);
        if (!Authorize.isAuthorized(token, config.testKey)) {
          throw new AuthorizationError();
        }

        logger.info(`Create Isolate Request:  ${prettyFormat(req.body)}`);
        const isolate = await Isolate.create(
          req.body.profileId,
          req.body.name,
          req.body.description,
          req.body.source,
        );
        res.status(201);
        res.send({ isolateId: isolate.id });
      } catch (err: unknown) {
        next(err);
      }
    },
  );

  app.get(
    '/isolate/:profileId',
    async (req: express.Request, res: express.Response, next: Function) => {
      try {
        const token = extractAuthTokenFromHeaders(req.headers as any);
        if (!Authorize.isAuthorized(token, config.testKey)) {
          throw new AuthorizationError();
        }

        const profileId = parseInt(req.params['profileId']);
        logger.info(`Fetching Isolates for profile:${profileId}`);
        const isolates = await Isolate.getForProfile(profileId);

        res.status(200);
        res.send({ isolates });
      } catch (err: unknown) {
        next(err);
      }
    },
  );

  app.post(
    '/isolate/_run',
    async (req: express.Request, res: express.Response, next: Function) => {
      try {
        const token = extractAuthTokenFromHeaders(req.headers as any);
        if (!Authorize.isAuthorized(token, config.testKey)) {
          throw new AuthorizationError();
        }

        logger.info(`Run Isolate Request: ${prettyFormat(req.body)}`);
        const input = req.body.inputString ?? '';
        const response = await Isolate.run(
          req.body.profileId,
          req.body.isolateId,
          input,
        );

        res.status(201);
        res.send({ response });
      } catch (err: unknown) {
        next(err);
      }
    },
  );
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
