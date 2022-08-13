import express from 'express';
import config from '../../common/config';
import { AuthorizationError, ValidationError } from '../../common/error.list';
import logger from '../../common/logger';
import prettyFormat from '../../common/prettyFormat';
import Authorize from '../../core/authenticate';
import Profile from '../../db/repositories/profile';

export default function addProfileRoutes(app: express.Express) {
  app.post(
    '/profile',
    async (req: express.Request, res: express.Response, next: Function) => {
      try {
        const token = extractAuthTokenFromHeaders(req.headers as any);
        if (!Authorize.isAuthorized(token, config.testKey)) {
          throw new AuthorizationError();
        }

        if (!req.body) {
          throw new ValidationError();
        }

        const profile = await Profile.create(req.body.name, req.body.key);

        res.status(201);
        res.send({ profileId: profile.id });
      } catch (err: unknown) {
        next(err);
      }
    },
  );

  app.get('/profile', async (req, res) => {
    logger.info(`Run request:  ${prettyFormat(req.body)}`);
    res.status(200);
  });
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
