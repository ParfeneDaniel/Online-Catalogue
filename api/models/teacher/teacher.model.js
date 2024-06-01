import mongoose from "mongoose";

const teacherSchema = mongoose.Schema(
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
    subjects: {
      type: [String],
      required: true,
    },
    classMaster: {
      type: Boolean,
      default: false,
    },
    classes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
      },
    ],
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
