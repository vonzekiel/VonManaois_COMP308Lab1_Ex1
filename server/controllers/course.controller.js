import Course from "../models/course.model.js";
import { errorHandler } from "../utils/error.js";

/**
 * Add a new course.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const addCourse = async (req, res, next) => {
  const { courseCode, courseName, section, semester } = req.body;
  try {
    const newCourse = new Course({ courseCode, courseName, section, semester });
    await newCourse.save();
    res.status(201).json({ message: "Course added successfully!" });
  } catch (error) {
    next(error);
  }
};

/**
 * List all courses.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const listAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

/**
 * Update an existing course.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const updateCourse = async (req, res, next) => {
  const { courseId } = req.params;
  const { courseCode, courseName, section, semester } = req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { courseCode, courseName, section, semester },
      { new: true }
    );
    if (!updatedCourse) return next(errorHandler(404, "Course not found!"));
    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete an existing course.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const deleteCourse = async (req, res, next) => {
  const { courseId } = req.params;
  try {
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) return next(errorHandler(404, "Course not found!"));
    res.status(200).json({ message: "Course deleted successfully!" });
  } catch (error) {
    next(error);
  }
};
