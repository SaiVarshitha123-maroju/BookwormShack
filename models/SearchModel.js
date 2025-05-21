import mongoose from "mongoose";

const dictionarySchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
    },
    meaning: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("searchmodel", dictionarySchema);
