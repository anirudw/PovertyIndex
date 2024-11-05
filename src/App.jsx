import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './Login';
import Dashboard from './Dashboard';
import Form from './Form';
import Results from './Results';
import Scholarships from './Scholarships';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');
  const [povertyScore, setPovertyScore] = useState(0);

  const pageVariants = {
    initial: { opacity: 0, x: '-100%' },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: '100%' }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  const handleLogin = (email) => {
    setCurrentUser({ email });
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const handleFormSubmit = (score) => {
    setPovertyScore(score);
    setCurrentPage('results');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {currentPage === 'login' && <Login onLogin={handleLogin} />}
          {currentPage === 'dashboard' && (
            <Dashboard
              user={currentUser}
              onLogout={handleLogout}
              onStartAssessment={() => setCurrentPage('form')}
              onViewResults={() => setCurrentPage('results')}
            />
          )}
          {currentPage === 'form' && (
            <Form onSubmit={handleFormSubmit} onCancel={() => setCurrentPage('dashboard')} />
          )}
          {currentPage === 'results' && (
            <Results
              score={povertyScore}
              onBackToDashboard={() => setCurrentPage('dashboard')}
              onViewScholarships={() => setCurrentPage('scholarships')}
            />
          )}
          {currentPage === 'scholarships' && (
            <Scholarships
              score={povertyScore}
              onBack={() => setCurrentPage('results')}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}