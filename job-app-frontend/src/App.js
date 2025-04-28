import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import JobList from './components/JobList';
import JobDetails from './components/JobDetails';
import JobForm from './components/JobForm';
// import CompanyDetails from './components/CompanyDetails';
import Login from './components/Login';
import Register from './components/Register';
import CompanyDashboard from './components/CompanyDashboard';
// import JobApplicationForm from './components/JobApplicationForm';
import UserApplications from './components/UserApplications';
import CompanyApplications from './components/CompanyApplications';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/main.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<JobList />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              {/* <Route path="/companies/:id" element={<CompanyDetails />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected routes - Job seeker */}
              {/* <Route path="/jobs/:jobId/apply" element={
                <ProtectedRoute requiredRole="ROLE_USER">
                  <JobApplicationForm />
                </ProtectedRoute>
              } /> */}
              <Route path="/applications" element={
                <ProtectedRoute requiredRole="ROLE_USER">
                  <UserApplications />
                </ProtectedRoute>
              } />

              {/* Protected routes - Company */}
              <Route path="/add" element={
                <ProtectedRoute requiredRole="ROLE_COMPANY">
                  <JobForm />
                </ProtectedRoute>
              } />
              <Route path="/edit/:id" element={
                <ProtectedRoute requiredRole="ROLE_COMPANY">
                  <JobForm />
                </ProtectedRoute>
              } />
              <Route path="/company/dashboard" element={
                <ProtectedRoute requiredRole="ROLE_COMPANY">
                  <CompanyDashboard />
                </ProtectedRoute>
              } />
              <Route path="/company/applications" element={
                <ProtectedRoute requiredRole="ROLE_COMPANY">
                  <CompanyApplications />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;