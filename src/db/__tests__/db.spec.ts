import ExecutedIsolate from '../../db/models/executedIsolate';
import Isolate from '../../db/models/isolate';
import Profile from '../../db/models/profile';
import { initializeDb, teardownDb } from '../index';

describe('test db models', () => {
  beforeEach(async () => {
    await initializeDb();
  });

  afterEach(async () => {
    await teardownDb();
  });

  it('test create profile', async () => {
    // Test full creation
    const profile = await Profile.create({
      name: 'Test',
      token: 'Unknown',
    } as any);
    expect(profile.id).toEqual(1);

    const isolate = await Isolate.create({
      name: 'Test',
      description: 'Unknown',
      source: 'Unknown',
      profileId: profile.id,
    });
    expect(isolate.id).toEqual(1);
    expect(isolate.profileId).toEqual(profile.id);

    const executedIsolate = await ExecutedIsolate.create({
      name: 'Test',
      outputString: 'output',
      inputString: 'input',
      profileId: profile.id,
      isolateId: isolate.id,
    });
    expect(executedIsolate.id).toEqual(1);
    expect(executedIsolate.profileId).toEqual(profile.id);

    // Test cascade delete
    await profile.destroy();
    const resp = await Profile.findAndCountAll({ where: { id: 1 } });
    expect(resp.count).toEqual(0);

    const isolateResp = await Isolate.findAndCountAll({
      where: { profileId: 1 },
    });
    expect(isolateResp.count).toEqual(0);
  });
});
