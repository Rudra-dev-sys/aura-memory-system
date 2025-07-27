import mongoose from "mongoose";

const memorySchema = new mongoose.Schema({
  text: { type: String, required: true },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Memory", memorySchema);
