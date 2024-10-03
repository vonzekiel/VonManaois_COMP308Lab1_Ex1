import Student from "../models/student.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Controller for user authentication and authorization

/**
 * Signin an admin user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const adminSignin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (username === "admin" && password === "admin") {
      const token = jwt.sign({ id: "admin" }, process.env.JWT_SECRET);
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ username: "admin" });
    } else {
      return next(errorHandler(401, "Invalid admin credentials!"));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Signin a student user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const studentSignin = async (req, res, next) => {
  const { studentNumber, password } = req.body;
  try {
    const validStudent = await Student.findOne({ studentNumber });
    if (!validStudent) return next(errorHandler(404, "Student not found!"));
    const validPassword = bcryptjs.compareSync(password, validStudent.password);
    if (!validPassword) return next(errorHandler(401, "Invalid credentials!"));
    const token = jwt.sign({ id: validStudent._id }, process.env.JWT_SECRET);
    const { password: pass, ...studentInfo } = validStudent._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(studentInfo);
  } catch (error) {
    next(error);
  }
};

/**
 * Logout the current user (admin or student).
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const logout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "User has been logged out!" });
  } catch (error) {
    next(error);
  }
};
