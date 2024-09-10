import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URL);

let docsCollection;

try {
  await client.connect();

  const db = client.db("webnotes");
  docsCollection = db.collection("docs");

  console.log("Database connected!");
} catch (err) {
  console.log(err);
}

export { docsCollection };
