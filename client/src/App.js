// client/src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";

const BACKEND_URL = "https://aura-backend.onrender.com"; // ✅ change this to your actual backend URL

function App() {
  const [memory, setMemory] = useState("");
  const [category, setCategory] = useState("");
  const [memories, setMemories] = useState([]);
  const [stats, setStats] = useState({ total: 0, characters: 0 });

  const fetchMemories = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/memories`);
      const data = await res.json();
      setMemories(data);
      const total = data.length;
      const characters = data.reduce((sum, mem) => sum + mem.text.length, 0);
      setStats({
        total,
        characters,
        average: total === 0 ? 0 : (characters / total).toFixed(2),
      });
    } catch (err) {
      console.error("Error fetching memories:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!memory.trim()) return;
    try {
      await fetch(`${BACKEND_URL}/memories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: memory, category }),
      });
      setMemory("");
      setCategory("");
      fetchMemories();
    } catch (err) {
      console.error("Error saving memory:", err);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  return (
    <div className="App">
      <h1>🧠 Aura Memory System</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={memory}
          onChange={(e) => setMemory(e.target.value)}
          placeholder="Enter your memory..."
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (optional)"
        />
        <button type="submit">Save Memory</button>
      </form>

      <div className="stats">
        <h3>📊 Stats:</h3>
        <p>Total Memories: {stats.total}</p>
        <p>Total Characters: {stats.characters}</p>
        <p>Average Length: {stats.average || 0} chars</p>
      </div>

      <div className="memory-list">
        <h3>📘 Your Memories</h3>
        {memories.length === 0 && <p>No memories saved yet.</p>}
        {memories.map((mem, idx) => (
          <div key={idx} className="memory-card">
            <p>{mem.text}</p>
            {mem.category && <small>📁 {mem.category}</small>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
