const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Local JSON DB setup
const { Low, JSONFile } = require('lowdb');
const path = require('path');
const dbFile = path.join(__dirname, 'db.json');
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);

// Initialize DB with default structure if empty
(async () => {
  await db.read();
  db.data ||= { items: [] };
  await db.write();
})();

const app = express();

app.use(cors());
app.use(express.json());

// Pass db to routes
const itemRoutes = require("./routes/itemRoutes")(db);
app.use("/api/items", itemRoutes);

app.listen(process.env.PORT || 3000, () => console.log(`Server running on port ${process.env.PORT || 3000}`));