const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'files_manager';
const folderPath = process.env.FOLDER_PATH || '/tmp/files_manager';

const client = new MongoClient(url, { useUnifiedTopology: true });

class FilesController {
  static async postUpload(req, res) {
    try {
      await client.connect();
      console.log('Connected to MongoDB');

      const userId = getUserIdFromToken(req.token);
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const {
        name, type, parentId, isPublic, data,
      } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Missing name' });
      }
      if (!type || !['folder', 'file', 'image'].includes(type)) {
        return res.status(400).json({ error: 'Missing type' });
      }
      if (type !== 'folder' && !data) {
        return res.status(400).json({ error: 'Missing data' });
      }

      let parentFile = null;
      if (parentId) {
        const db = client.db(dbName);
        const filesCollection = db.collection('files');
        parentFile = await filesCollection.findOne({ _id: parentId });
        if (!parentFile) {
          return res.status(400).json({ error: 'Parent not found' });
        }
        if (parentFile.type !== 'folder') {
          return res.status(400).json({ error: 'Parent is not a folder' });
        }
      }

      const db = client.db(dbName);
      const filesCollection = db.collection('files');

      let localPath = null;
      if (type !== 'folder') {
        const fileData = Buffer.from(data, 'base64');
        const fileName = uuidv4();
        localPath = `${folderPath}/${fileName}`;
        fs.writeFileSync(localPath, fileData);
      }

      const newFile = {
        userId,
        name,
        type,
        isPublic: isPublic || false,
        parentId: parentId || 0,
        localPath,
      };

      const result = await filesCollection.insertOne(newFile);
      const insertedFile = result.ops[0];

      return res.status(201).json(insertedFile);
    } catch (error) {
      console.error('Error uploading file:', error);
      return res.status(500).json({ error: 'Internal server error' });
    } finally {
      await client.close();
      console.log('Connection to MongoDB closed');
    }
  }
}

module.exports = FilesController;
