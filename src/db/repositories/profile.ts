import { ValidationError } from '../../common/error.list';
import logger from '../../common/logger';
import prettyFormat from '../../common/prettyFormat';
import ProfileModel from '../models/profile';
export default class Profile {
  public static async create(name: string, key: string) {
    if (!Profile.isBase32(key)) {
      throw new ValidationError(`Key must be base32 encoded: ${key}`);
    }
    if (!name) {
      throw new ValidationError(`Wrong value for name: ${name}`);
    }

    try {
      return await ProfileModel.create({ name, key });
    } catch (err: unknown) {
      logger.error(
        `Error when inserting profile name: ${name}, key: ${key}, ${prettyFormat(
          err,
        )} `,
      );
      throw new Error();
    }
  }

  public static async doesProfileExist(id: number) {
    const profile = await ProfileModel.findOne({ where: { id } });
    return profile ? true : false;
  }

  public static async getKeyForProfile(id: number) {
    if (!Number.isFinite(id)) {
      throw new ValidationError(`Profile id be base32 encoded: ${id}`);
    }
    const profile = await ProfileModel.findOne({ where: { id } });
    if (!profile) {
      throw new ValidationError(`Unexsisting user with Id: ${id}`);
    }
    return profile.key;
  }

  private static isBase32(input: string) {
    const regex = /^([A-Z2-7=]{8})+$/;
    return regex.test(input);
  }
}
