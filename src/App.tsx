import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SocketProvider } from './contexts/SocketContext';
import { Desktop } from './screens/Desktop';
import { TeacherDashboard } from './screens/TeacherDashboard';
import { StudentDashboard } from './screens/StudentDashboard';
import { StudentLogin } from './screens/StudentLogin';

function App() {
  return (
    <SocketProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Desktop />} />
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/student/login" element={<StudentLogin />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </SocketProvider>
  );
}

export default App;