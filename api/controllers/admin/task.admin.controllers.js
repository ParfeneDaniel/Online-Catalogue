import Teacher from "../../models/teacher/teacher.model.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { client } from "../../server.js";
import { sendVerificationEmail } from "../../utils/admin/sendVerificationEmail.js";

export const addTeacher = async (req, res) => {
  try {
    const { password } = req.body;
    const teacher = Teacher(req.body);
    const emailToken = crypto.randomBytes(64).toString("hex");
    teacher.emailToken = emailToken;
    teacher.isVerify = false;
    const hashedPassword = bcrypt.hashSync(password, 10);
    teacher.password = hashedPassword;
    teacher.previousPasswords = hashedPassword;
    await Promise.all([
      teacher.save(),
      client.setEx(emailToken, 2 * 60, "value"),
      sendVerificationEmail(teacher), 
    ]);
    res.status(201).json({ message: "You just added a teacher" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", errors: error.message });
  }
};
