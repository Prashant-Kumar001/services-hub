
import mongoose, { Schema, Document } from "mongoose";

const TodoSchema: Schema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "completed", "archived"],
      default: "active",
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

TodoSchema.index({ status: 1, createdAt: -1 });
TodoSchema.index({ completed: 1 });
TodoSchema.index({ favorite: 1 });

TodoSchema.pre("save", function (next) {
  this.lastModified = new Date();
  next();
});

export default mongoose.models.Todo ||
  mongoose.model("Todo", TodoSchema);
