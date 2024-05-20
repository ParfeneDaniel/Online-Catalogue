import express from "express";
import { signIn } from "../../controllers/admin/auth.admin.controllers.js";

const router = express.Router();

router.post("/signin", signIn);

export default router;
