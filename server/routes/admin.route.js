import express from "express";
import {
  addStudent,
  listAllStudents,
  listAllCourses,
  listStudentsInCourse,
  addCourse,
} from "../controllers/admin.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Route for adding a student (protected)
router.post("/student/add", verifyToken, addStudent);

// Route for listing all students (protected)
router.get("/students", verifyToken, listAllStudents);

// Route for listing all courses (protected)
router.get("/courses", verifyToken, listAllCourses);

// Route for listing all students in a specific course (protected)
router.get("/course/:courseId/students", verifyToken, listStudentsInCourse);

// Route for adding a course (protected)
router.post("/course/add", verifyToken, addCourse);

export default router;
