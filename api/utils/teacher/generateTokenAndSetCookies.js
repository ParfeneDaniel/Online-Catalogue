import jwt from "jsonwebtoken";
import { client } from "../../server.js";

const REFRESH_TOKEN_TEACHER = process.env.REFRESH_TOKEN_TEACHER;
const ACCESS_TOKEN_TEACHER = process.env.ACCESS_TOKEN_TEACHER;

const timeToLive = 15 * 24 * 60 * 60;

export const generateTokenAndSetCookies = async (res, user) => {
  try {
    const accessToken = jwt.sign({ id: user._id }, ACCESS_TOKEN_TEACHER, {
      //expiresIn: "30s",
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN_TEACHER, {
      //expiresIn: "2m",
      expiresIn: "15d",
    });
    await client.setEx(refreshToken, timeToLive, "value");
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
