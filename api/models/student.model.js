import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
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
    previousPassword: [String],
    class: {
      type: String,
      required: true,
    },
    classMaster: {
      type: String,
      required: true,
    },
    teachers: {
      type: Map,
      of: String,
    },
    grades: {
      type: Map,
      of: [
        {
          grade: {
            type: Number,
          },
          date: {
            type: Date,
          },
        },
      ],
    },
    absences: {
      type: Map,
      of: [Date],
    },
    mentions: {
      type: Map,
      of: [
        {
          mention: {
            type: String,
          },
          date: {
            type: Date,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);

export default Student;
