import request from 'supertest';
import { initializeDb, teardownDb } from '../../db/index';
import app from '../server';

describe('test root', () => {
  beforeEach(() => {
    initializeDb();
  });

  afterEach(() => {
    teardownDb();
  });

  it('test returns ok', async () => {
    const resp = await request(app).get('/');
    expect(resp.statusCode).toEqual(200);
    expect(resp.body.status).toEqual('OK');
  });
});
