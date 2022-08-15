import { ValidationError } from '../../common/error.list';
import runIsolate from '../runIsolate';

describe('test isolate runner', () => {
  it('wrong input isolateid', async () => {
    expect.assertions(1);
    try {
      await runIsolate('a' as any, 'log2)', '');
    } catch (err: unknown) {
      expect(err instanceof ValidationError).toBeTruthy();
    }
  });

  it('wrong input isolateSource', async () => {
    expect.assertions(1);
    try {
      await runIsolate(1, 1 as any, '');
    } catch (err: unknown) {
      expect(err instanceof ValidationError).toBeTruthy();
    }
  });

  it('wrong input input string', async () => {
    expect.assertions(1);
    try {
      await runIsolate(1, 1 as any, '');
    } catch (err: unknown) {
      expect(err instanceof ValidationError).toBeTruthy();
    }
  });

  it('successful execute', async () => {
    const response = await runIsolate(
      1,
      ` ret = 2 + 2;set(ret);
    new Promise(function(myResolve, myReject) {
    // "Producing Code" (May take some time)
    myResolve(set(12838382)); // when successful
    }); 
    `,
      '',
    );
    expect(response).toEqual(12838382);
  });

  it('non compilable script', async () => {
    expect.assertions(1);
    try {
      await runIsolate(1, 'log2)', '');
    } catch (err: unknown) {
      expect(err instanceof ValidationError).toBeTruthy();
    }
  });
});
