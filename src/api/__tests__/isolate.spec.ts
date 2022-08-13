import request from 'supertest';
import totp from 'totp-generator';
import config from '../../common/config';
import { initializeDb, teardownDb } from '../../db/index';
import app from '../server';

describe('test root', () => {
  beforeEach(async () => {
    await initializeDb();
  });

  afterEach(async () => {
    await teardownDb();
  });

  it('test returns unauthorized wrong', async () => {
    const resp = await request(app)
      .post('/isolate')
      .send({ name: 'test_isolate', description: 'descr', source: '2+2' })
      .set({ Authorization: 'Bearer wrong token' })
      .set({ [config.profileHeader]: config.profileHeader });
    expect(resp.statusCode).toEqual(403);
  });

  it('test returns unauthorized malformed', async () => {
    const resp = await request(app)
      .post('/isolate')
      .send({ name: 'test_isolate', description: 'descr', source: '2+2' })
      .set({ Authorization: 'Bearer wrong token' })
      .set({ [config.profileHeader]: config.profileHeader });
    expect(resp.statusCode).toEqual(403);
  });

  it('test returns ok', async () => {
    const token = totp(config.testKey, { period: config.tokenTimeout });
    const resp = await request(app)
      .post('/isolate')
      .send({ name: 'test_isolate', description: 'descr', source: '2+2' })
      .set({ Authorization: `Bearer ${token}` })
      .set({ [config.profileHeader]: config.profileHeader });
    expect(resp.statusCode).toEqual(201);
  });
});
