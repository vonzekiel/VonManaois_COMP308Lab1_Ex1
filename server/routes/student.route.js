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
router.post("/course/add", verifyToken, addCourse);

// Route for updating a course for a student (protected)
router.put("/course/update", verifyToken, updateCourse);

// Route for dropping a course for a student (protected)
router.delete("/course/drop", verifyToken, dropCourse);

// Route for listing all courses taken by a student (protected)
router.get("/courses/:studentId", verifyToken, listStudentCourses);

export default router;
