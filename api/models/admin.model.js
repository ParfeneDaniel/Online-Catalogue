import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailToken: {
      type: String,
    },
    isVerify: {
      type: Boolean,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    previousPasswords: [String],
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", teacherSchema);

export default Admin;
