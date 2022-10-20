import 'dotenv/config';
import mongoose from 'mongoose';

const options = {
  dbName: process.env.MONGO_INITDB_DATABASE,
};

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI
    || '',
) => mongoose.connect(mongoDatabaseURI, options);

export default connectToDatabase;