import { model, Schema } from "mongoose";
import { User } from "../interfaces/user.interfaces";

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },

    password: {
      type: String,
    },

    resetPassword: {
      type: String,
    },

    status: {
      type: Boolean,
      default: true,
    },

    rol: {
      type: String,
      default: "USER",
    },

    img: {
      type: String,
    },

    unsuccessfulAttempts: {
      type: Number,
    },

    blockedUntil: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const userModel = model("User", userSchema);
