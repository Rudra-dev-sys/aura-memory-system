import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let memories = [];

// ✅ Root route to handle `/` and show server is running
app.get("/", (req, res) => {
  res.send("🧠 Aura Memory System API is running!");
});

// ✅ Get all memories
app.get("/api/memories", (req, res) => {
  res.json(memories);
});

// ✅ Add a new memory
app.post("/api/memories", (req, res) => {
  const { content, category } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Memory content is required." });
  }

  const newMemory = {
    id: Date.now().toString(),
    content,
    category: category || "",
    createdAt: new Date().toISOString(),
  };

  memories.push(newMemory);
  res.status(201).json(newMemory);
});

// ✅ Stats route
app.get("/api/stats", (req, res) => {
  const total = memories.length;
  const totalChars = memories.reduce((sum, m) => sum + m.content.length, 0);
  const avgLength = total === 0 ? 0 : totalChars / total;

  res.json({
    totalMemories: total,
    totalCharacters: totalChars,
    averageLength: avgLength.toFixed(2),
  });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Aura Memory System API is running on port ${PORT}`);
});
