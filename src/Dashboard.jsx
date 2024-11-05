import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, FileText, BarChart } from 'lucide-react';

export default function Dashboard({ user, onLogout, onStartAssessment, onViewResults }) {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"
        >
          <h1 className="text-2xl font-semibold mb-4">Welcome, {user.email}</h1>
          <div className="space-y-4">
            <button
              onClick={onStartAssessment}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <FileText className="mr-2" /> Start Assessment
            </button>
            <button
              onClick={onViewResults}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
            >
              <BarChart className="mr-2" /> View Results
            </button>
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
            >
              <LogOut className="mr-2" /> Logout
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}