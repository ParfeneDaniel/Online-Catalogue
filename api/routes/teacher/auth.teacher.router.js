import express from "express"
import { signIn, verifyEmail } from "../../controllers/teacher/auth.teacher.controllers.js";

const router = express.Router();

router.post("/signin", signIn);
router.post("/verifyEmail/:emailToken", verifyEmail);

export default router;