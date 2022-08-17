import ivm from 'isolated-vm';
import { ValidationError } from '../common/error.list';
import logger from '../common/logger';
import prettyFormat from '../common/prettyFormat';

const MEMORY_LIMIT = 30;

const runIsolate = async (
  isolateId: number,
  isolateSource: string,
  input: string,
) => {
  // Validate
  if (
    !Number.isInteger(isolateId) ||
    typeof isolateSource !== 'string' ||
    typeof input !== 'string'
  ) {
    logger.error(
      `Wrong arguments in run isolate: ${isolateId} ${isolateSource} ${input}`,
    );
    throw new ValidationError();
  }

  // Prepare Isolate
  const isolate = new ivm.Isolate({ memoryLimit: MEMORY_LIMIT });
  const context = isolate.createContextSync();
  const jail = context.global;
  let store = '';
  jail.setSync('log', function (...args: unknown[]) {
    console.log(...args);
  });

  jail.setSync('set', function (userSubmitted: any) {
    store = userSubmitted;
  });

  let ret = '';
  jail.setSync(ret, '');

  logger.info(`Compiling isolate:${isolateId}, source: ${isolateSource}`);
  const hostile = isolate.compileScriptSync(isolateSource);

  // run isolate
  try {
    await hostile.run(context, { promise: true });
    return store;
  } catch (err: unknown) {
    // TODO parse different types of errors
    logger.error(
      `Error executing isolate: ${isolateId}, source: ${isolateSource}, error: ${prettyFormat(
        err,
      )} `,
    );
    throw new ValidationError();
  }
};

export default runIsolate;
