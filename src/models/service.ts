import mongoose from "mongoose";
import { colorBrewer } from "react-syntax-highlighter/dist/esm/styles/hljs";

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true }, 
  href: { type: String, required: true },
  description: String,
  icon: String,
  popular: { type: Boolean, default: false },
  new: { type: Boolean, default: false },
  isFree: { type: Boolean, default: true },
  isPaid: { type: Boolean, default: false },
  isLearning: { type: Boolean, default: false },
  bgColor: String,
  borderColor: String,
  hoverColor: String,
  color: String,
});

export const ServiceModel =
  mongoose.models.Service || mongoose.model("Service", ServiceSchema);
