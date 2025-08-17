import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { User, Question, Vote } from '../src/models';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
  
  // Ensure indexes are created
  await User.ensureIndexes();
  await Question.ensureIndexes();
  await Vote.ensureIndexes();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});
