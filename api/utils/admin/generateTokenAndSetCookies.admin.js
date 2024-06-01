import jwt from "jsonwebtoken";
import { client } from "../../server.js";

const ACCESS_TOKEN_ADMIN = process.env.ACCESS_TOKEN_ADMIN;
const REFRESH_TOKEN_ADMIN = process.env.REFRESH_TOKEN_ADMIN;

const timeToLive = 15 * 24 * 60 * 60;

export const generateTokenAndSetCookies = async (res, user) => {
  try {
    const accessToken = jwt.sign({ id: user._id }, ACCESS_TOKEN_ADMIN, {
      //expiresIn: "30s",
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN_ADMIN, {
      //expiresIn: "2m",
      expiresIn: "15d",
    });
    await Promise.all([
      client.setEx(refreshToken, timeToLive, "value"),
      client.setEx(user.username, timeToLive, "value"),
    ]);
    res
      .cookie("refreshToken", refreshToken, {
        maxAge: timeToLive * 1000,
        //maxAge: 2 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      })
      .json({ message: "You signin successfully", user, accessToken });
  } catch (error) {
    console.log(error.message);
  }
};
