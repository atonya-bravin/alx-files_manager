const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // Connection URL for MongoDB
    const url = `mongodb://${host}:${port}/${database}`;

    // Create a new MongoClient
    this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    this.isConnected = false;
    this.client.connect((err) => {
      if (!err) {
        this.isConnected = true;
        this.db = this.client.db(database);
      }
    });
  }

  isAlive() {
    return this.isConnected;
  }

  async nbUsers() {
    this.db = this.client.db(`${this.database}`);
    const collection = this.db.collection('users');
    return collection.countDocuments();
  }

  async nbFiles() {
    this.db = this.client.db(`${this.database}`);
    const collection = this.db.collection('files');
    return collection.countDocuments();
  }
}

export default new DBClient();
export { DBClient as dbClient };
