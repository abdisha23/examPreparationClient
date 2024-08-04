import React from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout"; // Ensure the path and case are correct
import HomePage from "./pages/home"; // Ensure the path and case are correct
import UploadMaterial from "./pages/UploadMaterial"; // Ensure the path and case are correct
import MaterialAccess from "./pages/AccessMaterial"; // Ensure the path and case are correct
import TakeQuiz from "./pages/TakeQuiz"; // Ensure the path and case are correct
import UploadExam from "./pages/uploadExam"; // Ensure the path and case are correct
import TakeExam from "./pages/TakeExam"; // Ensure the path and case are correct
import UploadQuiz from "./pages/uploadQuiz"; // Ensure the path and case are correct
import Forum from "./pages/Forum"; // Ensure the path and case are correct
import AddCourse from "./pages/AddCourse"; // Ensure the path and case are correct
import Login from "./pages/login"; // Ensure the path and case are correct
import ForgotPassword from "./pages/ForgotPassword"; // Ensure the path and case are correct
import SME from "./pages/SME"; // Ensure the path and case are correct
import Student from "./pages/Student"; // Ensure the path and case are correct
import Admin from "./pages/Admin"; // Ensure the path and case are correct
import { SecuredRoute } from "./routes/SecuredRoute"; // Ensure the path and case are correct

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/upload-material"
            element={
              <SecuredRoute>
                <UploadMaterial />
              </SecuredRoute>
            }
          />
          <Route path="/access-material" element={<MaterialAccess />} />
          <Route
            path="/upload-exam"
            element={
              <SecuredRoute>
                <UploadExam />
              </SecuredRoute>
            }
          />
          <Route
            path="/take-exam"
            element={
              <SecuredRoute>
                <TakeExam />
              </SecuredRoute>
            }
          />
          <Route
            path="/upload-quiz"
            element={
              <SecuredRoute>
                <UploadQuiz />
              </SecuredRoute>
            }
          />
          <Route path="/forum" element={<Forum />} />
          <Route
            path="/take-quiz"
            element={
              <SecuredRoute>
                <TakeQuiz />
              </SecuredRoute>
            }
          />
          <Route
            path="/add-course"
            element={
              <SecuredRoute>
                <AddCourse />
              </SecuredRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/sme" element={<SME />} />
          <Route path="/student" element={<Student />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
