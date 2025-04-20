import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import JobList from './components/JobList';
import JobDetails from './components/JobDetails';
import JobForm from './components/JobForm';
import CompanyDetails from './components/CompanyDetails'; // ✅ Add this line
import './styles/main.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/add" element={<JobForm />} />
            <Route path="/edit/:id" element={<JobForm />} />
            <Route path="/company/:id" element={<CompanyDetails />} />
            <Route path="/companies/:id" element={<CompanyDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
