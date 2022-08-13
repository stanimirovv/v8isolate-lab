// TODO config from env for key
class Config {
  public authHeader = 'Authorization';
  public profileHeader = 'XProfile';
  public tokenTimeout = 300;
  public servicePort = 3000;

  // TEST config
  public testProfile = 'Test';
  public testKey = 'NN2XE===';
}

export default new Config();
