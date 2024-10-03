import express from "express";
import {
  addCourse,
  listAllCourses,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";

const router = express.Router();

// Route for adding a new course
router.post("/add", addCourse);

// Route for listing all courses
router.get("/", listAllCourses);

// Route for updating an existing course by ID
router.put("/update/:courseId", updateCourse);

// Route for deleting an existing course by ID
router.delete("/delete/:courseId", deleteCourse);

export default router;
