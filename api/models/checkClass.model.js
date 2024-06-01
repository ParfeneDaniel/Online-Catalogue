import { checkSchema } from "express-validator";

export const classValidator = checkSchema({
  name: {
    in: ["body"],
    trim: true,
    escape: true,
    isLength: {
      options: { min: 2, max: 3 },
      errorMessage: "Name of class must have 2 or 3 characters",
    },
    matches: {
      options: "^[0-9][A-Z]$",
      errorMessage:
        "Name of class can contain just numbers and letters and begin with a number",
    },
  },
});
