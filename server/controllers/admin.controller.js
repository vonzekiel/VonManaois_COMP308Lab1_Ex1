import Student from "../models/student.model.js";
import Course from "../models/course.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

/**
 * Add a student.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const addStudent = async (req, res, next) => {
  try {
    const { password, ...studentData } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newStudent = new Student({
      ...studentData,
      password: hashedPassword,
    });
    await newStudent.save();
    res.status(201).json({ message: "Student added successfully!" });
  } catch (error) {
    next(error);
  }
};

/**
 * List all students.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const listAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
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
 * List all students taking a specific course.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const listStudentsInCourse = async (req, res, next) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId).populate("students");
    if (!course) return next(errorHandler(404, "Course not found!"));
    res.status(200).json(course.students);
  } catch (error) {
    next(error);
  }
};

/**
 * Add a course.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const addCourse = async (req, res, next) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json({ message: "Course added successfully!" });
  } catch (error) {
    next(error);
  }
};
