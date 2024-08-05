import express from "express"
import { addTeacher, getTeachers } from "../../controllers/admin/task.admin.controllers.js";
import { authorization } from "../../middlewares/admin/authorization.admin.js";
import { teacherValidator } from "../../models/teacher/checkTeacher.model.js";

const router = express.Router();

router.use(authorization);
router.post("/teacher", teacherValidator, addTeacher);
router.get("/teachers", getTeachers)

export default router;