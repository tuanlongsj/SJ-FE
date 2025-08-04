const express = require("express");
const { createItem } = require("../models/Item");

module.exports = (db) => {
  const router = express.Router();

  // Get all items
  router.get("/", (req, res) => {
    // // Generate a random sample item
    // const sample = {
    //   name: "Sample Item " + Math.floor(Math.random() * 100000),
    //   description: "This is a sample item for testing."
    // };
    // const item = createItem(sample);
    // db.get("items").push(item).write();



    const items = db.get("items").value();
    res.json(items);
  });

  // Add new item
  router.post("/", (req, res) => {
    const item = createItem(req.body);
    db.get("items").push(item).write();
    res.status(201).json(item);
  });

  // Get item by id
  router.get("/:id", (req, res) => {
    const item = db.get("items").find({ id: req.params.id }).value();
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  });

  // Update item by id
  router.put("/:id", (req, res) => {
    const item = db.get("items").find({ id: req.params.id }).assign(req.body).write();
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  });

  // Delete item by id
  router.delete("/:id", (req, res) => {
    const item = db.get("items").remove({ id: req.params.id }).write();
    if (!item || item.length === 0) return res.status(404).json({ error: "Item not found" });
    res.json(item[0]);
  });

  return router;
};