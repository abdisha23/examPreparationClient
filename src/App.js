import React from 'react';
import {Navigate} from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import HomePage from './pages/home';
import UploadMaterial from './pages/UploadMaterial';
import MaterialAccess from './pages/AccessMaterial';
import TrackProgress from './pages/TrackProgress';
import Quiz from './pages/Quiz';
import UploadExam from './pages/uploadExam';
import TakeExam from './pages/TakeExam';
import UploadQuiz from './pages/uploadQuiz';
import Forum from './pages/Forum';
import Signup from './pages/signup';
import Login from './pages/login';
import ForgotPassword from './pages/ForgotPassword';
import SME from './pages/SME';
import Student from './pages/Student';
import Admin from './pages/Admin';
import {SecuredRoute} from './routes/SecuredRoute';

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/upload-material" element={<UploadMaterial />} />
          <Route path="/access-material" element={<MaterialAccess />} />
          <Route path="/track-progress" element={<TrackProgress />} />
          <Route path="/upload-exam" element={<UploadExam />} />
          <Route path="take-exam" element={<SecuredRoute><TakeExam /></SecuredRoute>} />
          <Route path="/upload-quiz" element={<UploadQuiz />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/quiz" element={<Quiz />} />
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