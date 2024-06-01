import mongoose from "mongoose";

const classSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    classMaster: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
    },
    teachers: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Teacher",
        }, 
        subject: {
          type: String,
          required: true,
        },
      },
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { timestamps: true }
);

const Class = mongoose.model("Class", classSchema);

export default Class;
