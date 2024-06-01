import Admin from "../../models/admin/admin.model.js";
import { client } from "../../server.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookies } from "../../utils/admin/generateTokenAndSetCookies.admin.js";
import { validationResult } from "express-validator";

export const signUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { password } = req.body;
    const admin = new Admin(req.body);
    const hashpassword = bcrypt.hashSync(password, 15);
    admin.password = hashpassword;
    admin.previousPasswords = hashpassword;
    admin.emailToken = null;
    admin.isVerify = true;
    await admin.save();
    res.status(201).json({ message: "Admin was created" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", errors: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Admin.findOne({ username });
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
    const isConnected = await client.get(user.username);
    if (isConnected) {
      return res
        .status(403)
        .json({ errors: "Someone is already connected in this account" });
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

export const signOut = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const id = req.user.id;
    const admin = await Admin.findById(id);
    Promise.all([
      client.setEx(refreshToken, 1, "value"),
      client.setEx(admin.username, 1, "value"),
    ]);
    res
      .clearCookie("refreshToken")
      .status(201)
      .json({ message: "You signout successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", errors: error.message });
  }
};
