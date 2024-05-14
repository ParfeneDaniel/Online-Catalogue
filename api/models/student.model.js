import mongoose from "mongoose";

/* const gradeSchema = mongoose.Schema(
  {
    grade: {
      type: String,
    },
  },
  { timestamps: true }
); */

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
    },
    password: {
      type: String,
      required: true,
    },
    previousPassword: [
      {
        type: String,
      },
    ],
    class: {
      type: String,
      required: true,
    },
    grades: {
      type: Map,
      of: [
        {
          grade: {
            type: String,
          },
          date: {
            type: String,
          },
        },
      ],
    },
    absences: {
      type: Map,
      of: [String],
    },
    mentions: {
      type: Map,
      of: [
        {
          grades: {
            type: String,
          },
          date: {
            type: String,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);

export default Student;
