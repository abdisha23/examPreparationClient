import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home';
import MaterialAccess from './components/AccessMaterial';
import TrackProgress from './components/TrackProgress';
import Quiz from './components/Quiz'
import TakeExam from './components/TakeExam';
import Forum from './components/Forum';
import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import SME from './components/SME';
import Student from './components/Student';
import Admin from './components/Admin';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/access-material" element={<MaterialAccess />} />
        <Route path="/track-progress" element={<TrackProgress />} />
        <Route path="/take-exam" element={<TakeExam />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/signup" element={<Signup />} />
        <Route path ="/quiz" element={<Quiz/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path ="/sme" element={<SME/>}/>
        <Route path ="/student"element={<Student/>}/>
        <Route path ="/admin"element={<Admin/>}/>
      </Routes>
    </Router>
  );
};

export default App;
