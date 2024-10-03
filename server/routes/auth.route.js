import express from "express";
import {
  adminSignin,
  studentSignin,
  logout,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Route for admin sign-in
router.post("/admin/signin", adminSignin);

// Route for student sign-in
router.post("/student/signin", studentSignin);

// Route for logging out
router.post("/logout", logout);

export default router;
