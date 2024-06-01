import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

export const sendVerificationEmail = async (user) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });
    const mailOptions = {
      from: EMAIL,
      to: user.email,
      subject: "Verify your email",
      html: `<p>Your link for email verification is <a href="http://localhost:5173/teacher/verify/${user.emailToken}">here</a>. You have 3 minutes to verify your email.</p>`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error.message, "ERROR");
  }
};
