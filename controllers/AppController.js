const { redisClient } = require('../utils/redis');
const { db } = require('../utils/db');

class AppController {
  static async getStatus(req, res) {
    try {
      const isRedisAlive = await redisClient.isAlive();
      const isDbAlive = await db.isAlive();
      if (isRedisAlive && isDbAlive) {
        return res.status(200).json({ redis: true, db: true }); // Both Redis and DB are alive
      } if (isRedisAlive && !isDbAlive) {
        return res.status(200).json({ redis: true, db: false }); // Redis is alive, but DB is not
      } if (!isRedisAlive && isDbAlive) {
        return res.status(200).json({ redis: false, db: true }); // Redis is not alive, but DB is
      }
      return res.status(500).json({ redis: false, db: false }); // Both Redis and DB are not alive
    } catch (error) {
      console.error(error);
      return res.status(500).json({ redis: false, db: false }); // An error occurred
    }
  }

  static async getStats(req, res) {
    try {
      // Fetch the number of users and files from your database collections
      const numberOfUsers = await db.collection('users').countDocuments();
      const numberOfFiles = await db.collection('files').countDocuments();

      return res.status(200).json({ users: numberOfUsers, files: numberOfFiles });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ users: 0, files: 0 });
    }
  }
}

module.exports = AppController;
