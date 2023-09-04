const redis = require('redis');

class RedisClient {
  constructor(options) {
    this.redisClient = new redis.createClient(options);
    this.isConnected = true;

    this.redisClient.on('error', (err) => {
      this.isConnected = false;
      console.error(err);
    });
  }

  isAlive() {
    return this.isConnected;
  }

  async get(key) {
    await this.redisClient.get(key, (err, value) => {
      if (err) {
        return null;
      }
      return value;
    });
  }

  async set(key, value, duration) {
    await this.redisClient.setex(key, duration, value);
  }

  async del(key) {
    await this.redisClient.del(key);
  }
}

export default new RedisClient({
  host: 'localhost',
  port: 6379,
});
