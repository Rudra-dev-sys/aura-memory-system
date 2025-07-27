// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

axios.defaults.baseURL = "http://localhost:5000"; // ✅ Set backend base URL

function App() {
  const [memories, setMemories] = useState([]);
  const [stats, setStats] = useState({
    totalMemories: 0,
    totalCharacters: 0,
    averageLength: 0,
  });
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");

  const fetchMemories = async () => {
    try {
      const res = await axios.get("/api/memories");
      setMemories(res.data);
    } catch (error) {
      console.error("Fetch memories failed:", error);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get("/api/stats");
      setStats(res.data);
    } catch (error) {
      console.error("Fetch stats failed:", error);
    }
  };

  const saveMemory = async () => {
    if (!text.trim()) return alert("Memory cannot be empty");
    try {
      await axios.post("/api/memories", { text, category });
      setText("");
      setCategory("");
      fetchMemories();
      fetchStats();
    } catch (error) {
      console.error("Save memory failed:", error);
    }
  };

  useEffect(() => {
    fetchMemories();
    fetchStats();
  }, []);

  return (
    <div className="app">
      <h1 className="title">🧠 Aura Memory System</h1>
      <div className="input-section">
        <textarea
          placeholder="Type your memory here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          placeholder="Category (optional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button onClick={saveMemory}>Save Memory</button>
      </div>

      <div className="stats">
        <h3>📊 Stats:</h3>
        <p>Total Memories: {stats.totalMemories}</p>
        <p>Total Characters: {stats.totalCharacters}</p>
        <p>Average Length: {stats.averageLength} chars</p>
      </div>

      <div className="memory-list">
        {memories.map((mem) => (
          <div key={mem._id} className="memory-card">
            <p>{mem.text}</p>
            {mem.category && <span>📁 {mem.category}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
