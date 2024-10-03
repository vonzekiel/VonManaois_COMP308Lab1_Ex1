import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

function AdminDashboard() {
  const { currentUser, token } = useAuth();
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [studentData, setStudentData] = useState({
    studentNumber: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phoneNumber: "",
    email: "",
    program: "",
    favoriteTopic: "",
    strongestTechnicalSkill: "",
  });
  const [courseData, setCourseData] = useState({
    courseCode: "",
    courseName: "",
    section: "",
    semester: "",
  });
  const [courseId, setCourseId] = useState("");
  const [studentsInCourse, setStudentsInCourse] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/students",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (Array.isArray(response.data)) {
        setStudents(response.data);
      } else {
        console.error("Error: Expected an array of students");
      }
    } catch (err) {
      console.error("Error fetching students", err);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/course/");
      if (Array.isArray(response.data)) {
        setCourses(response.data);
      } else {
        console.error("Error: Expected an array of courses");
      }
    } catch (err) {
      console.error("Error fetching courses", err);
    }
  };

  const fetchStudentsInCourse = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/course/${courseId}/students`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (Array.isArray(response.data)) {
        setStudentsInCourse(response.data);
      } else {
        console.error("Error: Expected an array of students in course");
      }
    } catch (err) {
      console.error("Error fetching students in course", err);
    }
  };

  const handleAddStudent = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/admin/student/add",
        studentData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchStudents();
      setStudentData({
        studentNumber: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        phoneNumber: "",
        email: "",
        program: "",
        favoriteTopic: "",
        strongestTechnicalSkill: "",
      });
    } catch (err) {
      console.error("Error adding student", err);
    }
  };

  const handleAddCourse = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/admin/course/add",
        courseData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCourses();
      setCourseData({
        courseCode: "",
        courseName: "",
        section: "",
        semester: "",
      });
    } catch (err) {
      console.error("Error adding course", err);
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-200 md:text-5xl lg:text-6xl text-center">
        Welcome to Admin Dashboard
      </h1>

      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Add Student
        </h2>
        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="studentNumber"
              >
                Student Number
              </label>
              <input
                id="studentNumber"
                type="text"
                value={studentData.studentNumber}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    studentNumber: e.target.value,
                  })
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={studentData.password}
                onChange={(e) =>
                  setStudentData({ ...studentData, password: e.target.value })
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={studentData.firstName}
                onChange={(e) =>
                  setStudentData({ ...studentData, firstName: e.target.value })
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={studentData.lastName}
                onChange={(e) =>
                  setStudentData({ ...studentData, lastName: e.target.value })
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="address"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                value={studentData.address}
                onChange={(e) =>
                  setStudentData({ ...studentData, address: e.target.value })
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="city"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                value={studentData.city}
                onChange={(e) =>
                  setStudentData({ ...studentData, city: e.target.value })
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="text"
                value={studentData.phoneNumber}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    phoneNumber: e.target.value,
                  })
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={studentData.email}
                onChange={(e) =>
                  setStudentData({ ...studentData, email: e.target.value })
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="program"
              >
                Program
              </label>
              <input
                id="program"
                type="text"
                value={studentData.program}
                onChange={(e) =>
                  setStudentData({ ...studentData, program: e.target.value })
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="favoriteTopic"
              >
                Favorite Topic
              </label>
              <input
                id="favoriteTopic"
                type="text"
                value={studentData.favoriteTopic}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    favoriteTopic: e.target.value,
                  })
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="strongestTechnicalSkill"
              >
                Strongest Technical Skill
              </label>
              <input
                id="strongestTechnicalSkill"
                type="text"
                value={studentData.strongestTechnicalSkill}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    strongestTechnicalSkill: e.target.value,
                  })
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddStudent}
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
          >
            Add Student
          </button>
        </form>
      </section>

      <section className="max-w-4xl p-6 mx-auto mt-6 bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Add Course
        </h2>
        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="courseCode"
              >
                Course Code
              </label>
              <input
                id="courseCode"
                type="text"
                value={courseData.courseCode}
                onChange={(e) =>
                  setCourseData({ ...courseData, courseCode: e.target.value })
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="courseName"
              >
                Course Name
              </label>
              <input
                id="courseName"
                type="text"
                value={courseData.courseName}
                onChange={(e) =>
                  setCourseData({ ...courseData, courseName: e.target.value })
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="section"
              >
                Section
              </label>
              <input
                id="section"
                type="text"
                value={courseData.section}
                onChange={(e) =>
                  setCourseData({ ...courseData, section: e.target.value })
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="semester"
              >
                Semester
              </label>
              <input
                id="semester"
                type="text"
                value={courseData.semester}
                onChange={(e) =>
                  setCourseData({ ...courseData, semester: e.target.value })
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddCourse}
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
          >
            Add Course
          </button>
        </form>
      </section>

      <section className="max-w-4xl p-6 mx-auto mt-6 bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          List of All Courses
        </h2>
        <ul className="mt-4 space-y-4">
          {courses.map((course) => (
            <li
              key={course._id}
              className="p-4 bg-gray-100 rounded-md shadow-md dark:bg-gray-700"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {course.courseName} ({course.courseCode})
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Section: {course.section}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Semester: {course.semester}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-4xl p-6 mx-auto mt-6 bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          List of All Students
        </h2>
        <ul className="mt-4 space-y-4">
          {students.map((student) => (
            <li
              key={student._id}
              className="p-4 bg-gray-100 rounded-md shadow-md dark:bg-gray-700"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {student.firstName} {student.lastName}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Student Number: {student.studentNumber}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Email: {student.email}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Program: {student.program}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-4xl p-6 mx-auto mt-6 bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Students in Course
        </h2>
        <select
          onChange={(e) => fetchStudentsInCourse(e.target.value)}
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.courseName}
            </option>
          ))}
        </select>
        <ul className="mt-4">
          {studentsInCourse.map((student) => (
            <li
              key={student._id}
              className="py-1 border-b text-gray-200 text-md"
            >
              {student.firstName} {student.lastName}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AdminDashboard;
