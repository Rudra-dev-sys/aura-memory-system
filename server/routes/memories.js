import express from "express";
import Memory from "../models/Memory.js";

const router = express.Router();

// GET all memories
router.get("/", async (req, res) => {
  try {
    const memories = await Memory.find().sort({ createdAt: -1 });
    res.json(memories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new memory
router.post("/", async (req, res) => {
  console.log("📝 Saving memory:", req.body);
  const { text, category } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "Text is required" });
  }

  try {
    const newMemory = new Memory({ text, category });
    await newMemory.save();
    res.status(201).json(newMemory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
