import logger from 'common/logger';
import Profile from 'db/repositories/profile';
import ivm from 'isolated-vm';
import { ValidationError } from '../common/error.list';
import { IsolateModel } from '../db/models/isolate';

const isolateTest = async () => {
  const isolate = new ivm.Isolate({ memoryLimit: 30 });
  const context = isolate.createContextSync();
  const jail = context.global;
  jail.setSync('log', function (...args: unknown[]) {
    console.log(...args);
  });

  jail.setSync('ret', 0);

  const hostile = isolate.compileScriptSync(
    `const result = 5 + 5; log('hello world', result); ret = result`,
  );
  const resp = await hostile.run(context);
  console.log('resp:', resp);
};

export class Isolate {
  async create(
    profileId: number,
    name: string,
    description: string,
    source: string,
  ) {
    if (!name || !description) {
      logger.error(
        `Invalid name or description. name: ${name}, ${description}`,
      );
      throw new ValidationError();
    }

    const exists = await Profile.doesProfileExist(profileId);
    if (!exists) {
      logger.error(`Unexisting profile. id: ${profileId}`);
      throw new ValidationError();
    }

    logger.info(
      `Creating Isolate: profileId: ${profileId} name: ${name}, source: ${source} `,
    );

    const isolate = await IsolateModel.create({
      name,
      description,
      source,
      profileId,
    });
    logger.info(`Isolate ${name} created successfully. Id: ${isolate.id}`);

    return isolate;
  }
}

export default isolateTest;
