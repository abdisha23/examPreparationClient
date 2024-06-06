import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import HomePage from './pages/home';
import MaterialAccess from './pages/AccessMaterial';
import TrackProgress from './pages/TrackProgress';
import Quiz from './pages/Quiz';
import TakeExam from './pages/TakeExam';
import Forum from './pages/Forum';
import Signup from './pages/signup';
import Login from './pages/login';
import ForgotPassword from './pages/ForgotPassword';
import SME from './pages/SME';
import Student from './pages/Student';
import Admin from './pages/Admin';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/access-material" element={<MaterialAccess />} />
          <Route path="/track-progress" element={<TrackProgress />} />
          <Route path="/take-exam" element={<TakeExam />} />
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