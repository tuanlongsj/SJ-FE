const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// CREATE
router.post("/", async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
      let items = await Item.find();

    //   // Generate a random sample item
    //   const sample = {
    //     name: "Sample Item " + Math.floor(Math.random() * 100000),
    //     description: "This is a sample item for testing."
    //   };
    //   const createdItem = await Item.create(sample);
    //   items = [createdItem];

    res.json(items);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

console.log("Fetching all items");

    const items = await Item.find();
    res.json(items);
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
