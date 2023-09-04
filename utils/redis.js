const redis = require('redis');

class RedisClient {
  constructor(options) {
    this.redisClient = new redis.createClient(options);

    this.redisClient.on('error', (err) => {
      console.error(err);
    });
  }

  isAlive() {
    this.redisClient.on('connect', () => {
      return true;
    });
    return false;
  }

  async get(key) {
    const reply = await this.redisClient.get(key);
    return reply;
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
