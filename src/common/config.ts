import dotenv from 'dotenv';
dotenv.config();

// TODO config from env for key
class Config {
  public authHeader = 'Authorization';
  public profileHeader = 'XProfile';
  public tokenTimeout = 300;
  public servicePort = 3000;

  // TEST config
  public testProfile = 'Test';
  public testKey = 'NN2XE===';
  public unauthorizedToken = process.env['UNAUTHORIZED_TOKEN'];
  public unauthorizedTokenMalformed = process.env['MALFORMED_TOKEN'];
  public unauthorizedWrongToken = process.env['WRONG_TOKEN'];
}

export default new Config();
