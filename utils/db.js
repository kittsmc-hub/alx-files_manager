const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const url = `mongodb://${host}:${port}/${database}`;

    this.connect(url);
  }

  async connect(url) {
    this.connection = await MongoClient.connect(url);
  }

  async isAlive() {
    try {
      await this.connection.connect();
      return true;
    } catch (error) {
      return false;
    }
  }

  async nbUsers() {
    try {
      const db = this.connection.db();
      const usersCollection = db.collection('users');
      const count = await usersCollection.countDocuments();
      return count;
    } catch (error) {
      return 0;
    }
  }

  async nbFiles() {
    try {
      const db = this.connection.db();
      const filesCollection = db.collection('files');
      const count = await filesCollection.countDocuments();
      return count;
    } catch (error) {
      return 0;
    }
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
