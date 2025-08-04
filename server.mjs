import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adapter = new FileSync(path.join(__dirname, "db.json"));
const db = low(adapter);

db.defaults({ items: [] }).write();

const app = express();

app.use(cors());
app.use(express.json());

import itemRoutes from "./routes/itemRoutes.js";
app.use("/api/items", itemRoutes(db));

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on port ${process.env.PORT || 3000}`)
);