import totp from 'totp-generator';
import config from '../common/config';

export default class Authorize {
  public static isAuthorized(token: string | undefined, key: string) {
    if (!token) {
      false;
    }

    const currentToken = totp(key, { period: config.tokenTimeout });
    return currentToken === token;
  }
}
