import Admin from "../../models/admin.model.js";
import { generateTokenAndSetCookies } from "../../utils/generateTokenAndSetCookies.js";
import bcrypt from "bcryptjs";

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
    const { password: hashedPassword, previousPasswords, ...rest } = user._doc;
    generateTokenAndSetCookies(res, rest);
    res.status(201);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", errors: error.message });
  }
};
