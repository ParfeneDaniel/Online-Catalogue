import Teacher from "../../models/teacher/teacher.model.js";
import { client } from "../../server.js";
import { generateTokenAndSetCookies } from "../../utils/teacher/generateTokenAndSetCookies.js";
import bcrypt from "bcryptjs";

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Teacher.findOne({ username });
    if (!user) {
      return res.status(403).json({ errors: "User or password not found" });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(403).json({ errors: "User or password not found" });
    }
    const isVerified = user.isVerify;
    if (!isVerified) {
      return res.status(403).json({ errors: "Account is not verified" });
    }
    const { password: hashedPassword, previousPasswords, ...rest } = user._doc;
    generateTokenAndSetCookies(res, rest);
    res.status(201);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", errors: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { emailToken } = req.params;
    const isValid = await client.get(emailToken);
    if (!isValid) {
      return res
        .status(400)
        .json({ errors: "You time for verification expired" });
    }
    const teacher = await Teacher.findOne({ emailToken });
    teacher.emailToken = null;
    teacher.isVerify = true;
    await Promise.all([teacher.save(), client.setEx(emailToken, 1, "value")]);
    res.status(201).json({ message: "Your email is verified" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", errors: error.message });
  }
};
