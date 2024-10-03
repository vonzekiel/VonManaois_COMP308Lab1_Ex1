import express from "express";
import {
  addCourse,
  updateCourse,
  dropCourse,
  listStudentCourses,
} from "../controllers/student.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Route for adding a course to a student (protected)
router.post("/course/add", addCourse);

// Route for updating a course for a student (protected)
router.put("/course/update", updateCourse);

// Route for dropping a course for a student (protected)
router.delete("/course/drop", dropCourse);

// Route for listing all courses taken by a student (protected)
router.get("/courses/:studentId", listStudentCourses);

export default router;
