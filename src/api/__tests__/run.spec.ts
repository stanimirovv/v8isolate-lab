import request from 'supertest';
import app from '../../api/server';

describe('test root', () => {
  it('test returns ok', async () => {
    const resp = await request(app).get('/');
    expect(resp.statusCode).toEqual(200);
    expect(resp.body.status).toEqual('OK');
  });
});
