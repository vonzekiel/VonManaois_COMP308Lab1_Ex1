import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

function StudentDashboard() {
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourseCode, setSelectedCourseCode] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [updateCourseId, setUpdateCourseId] = useState("");
  const [updateSection, setUpdateSection] = useState("");

  useEffect(() => {
    fetchCourses();
    fetchAvailableCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/student/courses/${currentUser._id}`
      );
      if (Array.isArray(response.data)) {
        setCourses(response.data);
      } else {
        console.error("Error: Expected an array of courses");
      }
    } catch (err) {
      console.error("Error fetching courses", err);
    }
  };

  const fetchAvailableCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/course/");
      if (Array.isArray(response.data)) {
        setAvailableCourses(response.data);
      } else {
        console.error("Error: Expected an array of available courses");
      }
    } catch (err) {
      console.error("Error fetching available courses", err);
    }
  };

  const handleAddCourse = async () => {
    try {
      const selectedCourse = availableCourses.find(
        (course) =>
          course.courseCode === selectedCourseCode &&
          course.section === selectedSection
      );
      if (!selectedCourse) {
        console.error("Error: Selected course not found");
        return;
      }
      await axios.post("http://localhost:8080/api/student/course/add", {
        courseId: selectedCourse._id,
        studentId: currentUser._id,
      });
      fetchCourses();
      setSelectedCourseCode("");
      setSelectedSection("");
    } catch (err) {
      console.error("Error adding course", err);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      const selectedCourse = availableCourses.find(
        (course) =>
          course.courseCode ===
            courses.find((c) => c._id === updateCourseId).courseCode &&
          course.section === updateSection
      );
      if (!selectedCourse) {
        console.error("Error: Selected course not found");
        return;
      }
      await axios.put("http://localhost:8080/api/student/course/update", {
        courseId: updateCourseId,
        section: updateSection,
      });
      fetchCourses();
      setUpdateCourseId("");
      setUpdateSection("");
    } catch (err) {
      console.error("Error updating course", err);
    }
  };

  const handleDropCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/student/course/drop`, {
        data: { courseId: id, studentId: currentUser._id },
      });
      fetchCourses();
    } catch (err) {
      console.error("Error dropping course", err);
    }
  };

  const groupedCourses = availableCourses.reduce((acc, course) => {
    if (!acc[course.courseCode]) {
      acc[course.courseCode] = [];
    }
    acc[course.courseCode].push(course);
    return acc;
  }, {});

  return (
    <div className="bg-gray-800">
      <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h1 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Welcome to Student Dashboard
        </h1>

        <div class="mt-6">
          <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">
            Add Course
          </h2>
          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                class="text-gray-700 dark:text-gray-200"
                htmlFor="courseCode"
              >
                Course Code
              </label>
              <select
                id="courseCode"
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
                value={selectedCourseCode}
                onChange={(e) => setSelectedCourseCode(e.target.value)}
              >
                <option value="">Select a course code</option>
                {Object.keys(groupedCourses).map((courseCode) => (
                  <option key={courseCode} value={courseCode}>
                    {courseCode}
                  </option>
                ))}
              </select>
            </div>
            {selectedCourseCode && (
              <div>
                <label
                  class="text-gray-700 dark:text-gray-200"
                  htmlFor="section"
                >
                  Section
                </label>
                <select
                  id="section"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                >
                  <option value="">Select a section</option>
                  {groupedCourses[selectedCourseCode].map((course) => (
                    <option key={course._id} value={course.section}>
                      Section {course.section} - {course.courseName}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div class="flex justify-end mt-6">
            <button
              class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              onClick={handleAddCourse}
            >
              Add Course
            </button>
          </div>
        </div>

        <div class="mt-6">
          <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">
            Update Course
          </h2>
          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                class="text-gray-700 dark:text-gray-200"
                htmlFor="updateCourse"
              >
                Course
              </label>
              <select
                id="updateCourse"
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
                value={updateCourseId}
                onChange={(e) => setUpdateCourseId(e.target.value)}
              >
                <option value="">Select a course to update</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.courseName} ({course.courseCode}) - Section{" "}
                    {course.section}
                  </option>
                ))}
              </select>
            </div>
            {updateCourseId && (
              <div>
                <label
                  class="text-gray-700 dark:text-gray-200"
                  htmlFor="updateSection"
                >
                  Section
                </label>
                <select
                  id="updateSection"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
                  value={updateSection}
                  onChange={(e) => setUpdateSection(e.target.value)}
                >
                  <option value="">Select a new section</option>
                  {groupedCourses[
                    courses.find((course) => course._id === updateCourseId)
                      .courseCode
                  ].map((course) => (
                    <option key={course._id} value={course.section}>
                      Section {course.section} - {course.courseName}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div class="flex justify-end mt-6">
            <button
              class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              onClick={handleUpdateCourse}
            >
              Update Course
            </button>
          </div>
        </div>

        <div class="mt-6">
          <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">
            Your Courses
          </h2>
          <ul class="mt-4 space-y-4">
            {courses.map((course) => (
              <li
                key={course._id}
                class="p-4 bg-gray-50 rounded-md shadow dark:bg-gray-700 text-white"
              >
                {course.courseName} ({course.courseCode}) - Section{" "}
                {course.section} - Semester {course.semester}
                <button
                  class="px-4 py-2 ml-4 text-sm text-white bg-red-600 rounded hover:bg-red-500"
                  onClick={() => handleDropCourse(course._id)}
                >
                  Drop
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default StudentDashboard;
