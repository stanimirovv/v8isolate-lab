import request from 'supertest';
import totp from 'totp-generator';
import app from '../../api/server';
import config from '../../common/config';
import { initializeDb, teardownDb } from '../../db/index';

describe('test root', () => {
  const PATH = '/profile';
  beforeEach(async () => {
    await initializeDb();
  });

  afterEach(async () => {
    await teardownDb();
  });

  it('requires authorization', async () => {
    const resp = await request(app)
      .post(PATH)
      .send({ name: 'test_profile', key: config.testKey })
      .set({ Authorization: 'Bearer wrong token' })
      .set({ [config.profileHeader]: config.profileHeader });
    expect(resp.statusCode).toEqual(403);
  });

  it('test creates profile ok', async () => {
    const token = totp(config.testKey, { period: config.tokenTimeout });
    const resp = await request(app)
      .post(PATH)
      .send({ name: 'test_profile', key: config.testKey })
      .set({ Authorization: `Bearer ${token}` })
      .set({ [config.profileHeader]: config.profileHeader });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body.profileId).toEqual(1);
  });
});
