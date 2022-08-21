import { initializeDb, teardownDb } from '../../../db';
import Profile from '../profile';

describe('test profile repository', () => {
  beforeEach(async () => {
    await initializeDb();
  });

  afterEach(async () => {
    await teardownDb();
  });

  it('test getKeyForProfile', async () => {
    const key = 'GEZDG===';
    const profile = await Profile.create('Asd', key);
    expect(profile.id).toEqual(1);

    const actualKey = await Profile.getKeyForProfile(1);
    expect(actualKey).toEqual(key);
  });
});
