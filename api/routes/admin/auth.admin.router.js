import express from "express";
import { signIn, signOut, signUp } from "../../controllers/admin/auth.admin.controllers.js";
import { authorization } from "../../middlewares/admin/authorization.admin.js";
import { adminValidator } from "../../models/admin/checkAdmin.model.js";

const router = express.Router();

router.post("/signin", signIn);
router.post("/signout", authorization, signOut);
router.post("/signup", adminValidator, signUp)

export default router;
 