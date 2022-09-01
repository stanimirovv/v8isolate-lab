import { ValidationError } from '../common/error.list';
import logger from '../common/logger';
import prettyFormat from '../common/prettyFormat';
import ExecutedIsolate from '../db/models/executedIsolate';
import { IsolateModel } from '../db/models/isolate';
import Profile from '../db/repositories/profile';
import runIsolate from './runIsolate';

export interface iIsolate {
  id: number;
  profileId: number;
  name: string;
  description: string;
  source: string;
}

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
    return isolates.map(
      ({ id, profileId, name, description, source }: iIsolate) => ({
        id,
        name,
        description,
        source,
        profileId,
      }),
    );
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

  public static async run(
    profileId: number,
    isolateId: number,
    inputString: string,
  ) {
    if (
      !Number.isInteger(profileId) ||
      !Number.isInteger(isolateId) ||
      typeof inputString !== 'string'
    ) {
      logger.error(
        `Invalid profileId or isolateId: ${profileId}, ${isolateId}`,
      );
      throw new ValidationError();
    }

    const isolates = await this.getForProfile(profileId);
    const filteredIsolates = isolates.filter((i) => i.id === isolateId);
    if (filteredIsolates.length !== 1) {
      logger.error(
        `Isolate count isn't 1 for profile: ${profileId} with ${isolateId} ${prettyFormat(
          filteredIsolates,
        )}, all: ${prettyFormat(isolates)})}`,
      );
      throw new Error('Internal Error');
    }

    const isolate = filteredIsolates[0];
    const outputString = await runIsolate(
      isolate.id,
      isolate.source,
      inputString,
    );

    const created = await ExecutedIsolate.create({
      isolateId,
      profileId,
      outputString,
      inputString,
    });

    return outputString;
  }
}
