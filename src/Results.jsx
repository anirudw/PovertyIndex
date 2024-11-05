import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Results({ score, onBackToDashboard, onViewScholarships }) {
  const povertyData = [
    { year: 2015, index: 80 },
    { year: 2016, index: 75 },
    { year: 2017, index: 70 },
    { year: 2018, index: 65 },
    { year: 2019, index: 60 },
    { year: 2020, index: 55 },
    { year: 2021, index: score }
  ];

  const categoryData = [
    { category: 'Income', value: score * 0.4 },
    { category: 'Housing', value: score * 0.3 },
    { category: 'Water', value: score * 0.2 },
    { category: 'Education', value: score * 0.1 }
  ];

  const getPovertyStatus = (score) => {
    if (score >= 70) return "Extreme Poverty";
    if (score >= 50) return "Moderate Poverty";
    if (score >= 30) return "At Risk of Poverty";
    return "Above Poverty Line";
  };

  const getEstimatedIncome = (score) => {
    const baseIncome = 27000;
    return Math.round((100 - score) / 100 * baseIncome * 2);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-3xl sm:mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Your Poverty Index Results</h2>
          <div className="mb-6">
            <p className="text-lg text-gray-700">Your Poverty Index Score: <span className="font-bold text-2xl text-blue-600">{score}/100</span></p>
            <p className="text-md text-gray-600">Status: {getPovertyStatus(score)}</p>
            <p className="text-md text-gray-600">Estimated Annual Income:  ₹{getEstimatedIncome(score).toLocaleString('en-IN')}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${score}%` }}></div>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Poverty Index Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={povertyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="index" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Poverty Index by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between">
            <button
              onClick={onBackToDashboard}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowLeft className="mr-2" /> Back to Dashboard
            </button>
            {score > 50 && (
              <button
                onClick={onViewScholarships}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <BookOpen className="mr-2" /> View Scholarships
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}