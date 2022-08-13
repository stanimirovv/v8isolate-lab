import ivm from 'isolated-vm';
import { ValidationError } from '../common/error.list';
import logger from '../common/logger';
import { IsolateModel } from '../db/models/isolate';
import Profile from '../db/repositories/profile';

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
  public static async create(
    profileId: number,
    name: string,
    description: string,
    source: string,
  ) {
    await Isolate.validateInput(profileId, name, description, source);

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

  public static async getForProfile(profileId: number) {
    if (!Number.isInteger(profileId)) {
      logger.error(`Wrong profile id: ${profileId}`);
      throw new ValidationError();
    }

    const exists = await Profile.doesProfileExist(profileId);
    if (!exists) {
      logger.error(`Unexisting profile. id: ${profileId}`);
      throw new ValidationError();
    }

    const isolates = await IsolateModel.findAll({ where: { profileId } });
    return isolates.map(({ id, name, description }) => ({
      id,
      name,
      description,
    }));
  }

  private static async validateInput(
    profileId: number,
    name: string,
    description: string,
    source: string,
  ) {
    const exists = await Profile.doesProfileExist(profileId);
    if (!exists) {
      logger.error(`Unexisting profile. id: ${profileId}`);
      throw new ValidationError();
    }

    if (!name || !description) {
      logger.error(
        `Invalid name or description. name: ${name}, ${description}`,
      );
      throw new ValidationError();
    }

    const hasIncorrectTypes =
      !Number.isInteger(profileId) ||
      typeof name !== 'string' ||
      typeof description != 'string' ||
      typeof source !== 'string';
    if (hasIncorrectTypes) {
      logger.error(`Wrong types in request`);
      throw new ValidationError();
    }
  }
}

export default isolateTest;
