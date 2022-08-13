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
      .set({ Authorization: 'Bearer wrong' })
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

  it('wrong profileId type', async () => {
    const token = totp(config.testKey, { period: config.tokenTimeout });
    const resp = await request(app)
      .post('/isolate')
      .send({
        name: 'test_isolate',
        description: 'descr',
        source: '2+2',
        profileId: 'wrong type',
      })
      .set({ Authorization: `Bearer ${token}` })
      .set({ [config.profileHeader]: config.profileHeader });
    expect(resp.statusCode).toEqual(422);
  });

  it('wrong profileId value', async () => {
    const token = totp(config.testKey, { period: config.tokenTimeout });
    const resp = await request(app)
      .post('/isolate')
      .send({
        name: 'test_isolate',
        description: 'descr',
        source: '2+2',
        profileId: -1,
      })
      .set({ Authorization: `Bearer ${token}` })
      .set({ [config.profileHeader]: config.profileHeader });
    expect(resp.statusCode).toEqual(422);
  });

  it('correct isolate creation', async () => {
    const token = totp(config.testKey, { period: config.tokenTimeout });

    let resp = await request(app)
      .post('/profile')
      .send({ name: 'test_profile', key: config.testKey })
      .set({ Authorization: `Bearer ${token}` })
      .set({ [config.profileHeader]: config.profileHeader });
    expect(resp.statusCode).toEqual(201);

    resp = await request(app)
      .post('/isolate')
      .send({
        name: 'test_isolate',
        description: 'descr',
        source: '2+2',
        profileId: resp.body.profileId,
      })
      .set({ Authorization: `Bearer ${token}` })
      .set({ [config.profileHeader]: config.profileHeader });
    expect(resp.statusCode).toEqual(201);
  });

  it('list isolates wrong user format', async () => {
    const token = totp(config.testKey, { period: config.tokenTimeout });
    const resp = await request(app)
      .get(`/isolate/wrong_type`)
      .set({ Authorization: `Bearer ${token}` })
      .set({ [config.profileHeader]: config.profileHeader });

    expect(resp.status).toEqual(422);
  });

  it('list isolates unexisting user', async () => {
    const token = totp(config.testKey, { period: config.tokenTimeout });
    const resp = await request(app)
      .get(`/isolate/19231298`)
      .set({ Authorization: `Bearer ${token}` })
      .set({ [config.profileHeader]: config.profileHeader });

    expect(resp.status).toEqual(422);
  });

  it('list isolates for user', async () => {
    const token = totp(config.testKey, { period: config.tokenTimeout });

    let resp = await request(app)
      .post('/profile')
      .send({ name: 'test_profile', key: config.testKey })
      .set({ Authorization: `Bearer ${token}` })
      .set({ [config.profileHeader]: config.profileHeader });
    expect(resp.statusCode).toEqual(201);
    const profileId = resp.body.profileId;

    resp = await request(app)
      .post('/isolate')
      .send({
        name: 'test_isolate',
        description: 'descr',
        source: '2+2',
        profileId: resp.body.profileId,
      })
      .set({ Authorization: `Bearer ${token}` })
      .set({ [config.profileHeader]: config.profileHeader });
    expect(resp.statusCode).toEqual(201);

    resp = await request(app)
      .get(`/isolate/${profileId}`)
      .set({ Authorization: `Bearer ${token}` })
      .set({ [config.profileHeader]: config.profileHeader });

    expect(resp.status).toEqual(200);
    expect(resp.body.isolates.length).toEqual(1);
    expect(resp.body.isolates).toEqual([
      { id: 1, description: 'descr', name: 'test_isolate' },
    ]);
  });
});
