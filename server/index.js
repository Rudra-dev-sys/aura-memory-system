import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { CohereClient } from 'cohere-ai';

const app = express();
const PORT = 5000;

// Initialize Cohere
const cohere = new CohereClient({ token: 'GYaUfIbJSmcsVkdQ9kqhvGmulmRtf84onnJT9flJ' }); // replace with your actual API key

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory store (for MVP)
let memories = [];

// Routes

// Health check
app.get('/', (req, res) => {
  res.send('Aura Memory System API is running!');
});

// Save memory
app.post('/api/save', async (req, res) => {
  const { memory, category } = req.body;
  if (!memory) {
    return res.status(400).json({ message: 'Memory is required' });
  }

  // Optional: Summarize or enhance the memory using Cohere here
  // const response = await cohere.summarize({ text: memory });

  const newMemory = {
    id: Date.now(),
    memory,
    category: category || 'general',
    timestamp: new Date()
  };

  memories.push(newMemory);
  res.status(201).json({ message: 'Memory saved', data: newMemory });
});

// Get all memories
app.get('/api/memories', (req, res) => {
  res.json({ memories });
});

// Delete a memory
app.delete('/api/memories/:id', (req, res) => {
  const id = parseInt(req.params.id);
  memories = memories.filter((m) => m.id !== id);
  res.json({ message: 'Memory deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
