import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
});

export const CategoryModel =
  mongoose.models.Category || mongoose.model("Categories", CategorySchema);
