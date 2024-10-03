import Student from "../models/student.model.js";
import Course from "../models/course.model.js";
import { errorHandler } from "../utils/error.js";

/**
 * Add a course to a student.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const addCourse = async (req, res, next) => {
  const { studentId, courseId } = req.body;
  try {
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);
    if (!student || !course)
      return next(errorHandler(404, "Student or Course not found!"));

    course.students.push(studentId);
    await course.save();

    res.status(200).json({ message: "Course added to student successfully!" });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a course for a student.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const updateCourse = async (req, res, next) => {
  const { courseId, section } = req.body;
  try {
    const course = await Course.findById(courseId);
    if (!course) return next(errorHandler(404, "Course not found!"));

    course.section = section;
    await course.save();

    res.status(200).json({ message: "Course updated successfully!" });
  } catch (error) {
    next(error);
  }
};

/**
 * Drop a course for a student.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const dropCourse = async (req, res, next) => {
  const { studentId, courseId } = req.body;
  try {
    const course = await Course.findById(courseId);
    if (!course) return next(errorHandler(404, "Course not found!"));

    course.students.pull(studentId);
    await course.save();

    res.status(200).json({ message: "Course dropped successfully!" });
  } catch (error) {
    next(error);
  }
};

/**
 * List all courses taken by a student.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const listStudentCourses = async (req, res, next) => {
  const { studentId } = req.params;
  try {
    const courses = await Course.find({ students: studentId });
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};
