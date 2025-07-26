import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    content: {
      type: String,
      trim: true,
      required: false,
    },
    category: {
      type: String,
      trim: true,
      required: false,
      default: null,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

NoteSchema.index({ userEmail: 1, createdAt: -1 });
NoteSchema.index({ userEmail: 1, isPinned: -1, createdAt: -1 });

NoteSchema.index({
  title: "text",
  content: "text",
});

NoteSchema.statics.findByUser = function (userEmail) {
  return this.find({ userEmail }).sort({ isPinned: -1, createdAt: -1 });
};

NoteSchema.statics.searchNotes = function (userEmail, searchTerm) {
  return this.find({
    userEmail,
    $text: { $search: searchTerm },
  }).sort({ score: { $meta: "textScore" } });
};

NoteSchema.methods.togglePin = function () {
  this.isPinned = !this.isPinned;
  return this.save();
};

export const Note = mongoose.models.Note || mongoose.model("Note", NoteSchema);

export default Note;
