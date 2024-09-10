import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URL);

let db;

try {
  await mongoClient.connect();
  db = mongoClient.db();
  console.log("Database connected!");
} catch (err) {
  console.log(err);
}

export default db;
