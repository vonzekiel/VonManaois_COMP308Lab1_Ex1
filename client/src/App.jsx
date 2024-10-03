import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";
import StudentLoginPage from "./pages/StudentLoginPage";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <Routes>
      <Route path="/" element={<StudentLoginPage />} />
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
