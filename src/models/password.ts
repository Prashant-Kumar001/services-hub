import mongoose, { Schema, Document, model, models } from "mongoose";

// {
//       id: "1",
//       title: "Gmail",
//       username: "john.doe",
//       email: "john.doe@gmail.com",
//       password: "SecurePass123!",
//       website: "https://gmail.com",
//       notes: "Personal email account",
//       category: "social",
//       favorite: true,
//       createdAt: new Date("2024-01-15"),
//       lastModified: new Date("2024-01-20"),
//       strength: "strong",
//     },

export interface IPassword extends Document {
  title: string;
  username: string;
  email: string;
  password: string;
  website: string;
  notes?: string;
  category?: string;
  favorite: boolean;
  lastModified: Date;
  strength: string;
}

const PasswordSchema: Schema = new Schema<IPassword>(
  {
    title: { type: String, required: true },
    email: { type: String, required: true },
    category: { type: String },
    favorite: { type: Boolean, default: false },
    strength: { type: String, required: true },
    website: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    notes: { type: String },
    lastModified: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

PasswordSchema.methods.togglefavorite = function () {
  this.favorite = !this.favorite;
  return this.save();
};

export const Password =
  models.Password || model<IPassword>("Password", PasswordSchema);
