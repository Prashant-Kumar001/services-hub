import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  userEmail: string;
  title: string;
  description?: string;
  status: "pending" | "completed";
  createdAt: Date;
  updatedAt?: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    userEmail: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Task ||
  mongoose.model<ITask>("Task", TaskSchema);
