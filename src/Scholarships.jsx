import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function Scholarships({ score, onBack }) {
  const scholarships = [
    {
      name: "e-Grantz",
      description: "Government scholarship for SC/ST/OEC students",
      eligibility: "Family income below ₹2,50,000/year",
      link: "https://egrantz.kerala.gov.in"
    },
    {
      name: "Reliance Foundation Scholarship",
      description: "Merit-cum-means scholarship for engineering students",
      eligibility: "Family income below ₹2,50,000/year",
      link: "https://reliancefoundation.org/scholarships"
    },
    {
      name: "AICTE Pragati Scholarship",
      description: "Scholarship for girl students in AICTE approved institutions",
      eligibility: "Family income below ₹8,00,000/year",
      link: "https://www.aicte-india.org/schemes/students-development-schemes/Pragati"
    },
    {
      name: "National Scholarship Portal",
      description: "Central government scholarships for minority students",
      eligibility: "Varies by scholarship",
      link: "https://scholarships.gov.in/"
    },
    {
      name: "Swami Vivekananda Scholarship",
      description: "Merit-based scholarship for undergraduate students",
      eligibility: "Based on Class 12 marks",
      link: "https://svmcm.wbhed.gov.in/"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-3xl sm:mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Recommended Scholarships</h2>
          {score > 50 ? (
            <>
              <p className="mb-4 text-gray-700">Based on your Poverty Index Score of {score}, here are some scholarships you might be eligible for:</p>
              <div className="space-y-4">
                {scholarships.map((scholarship, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900">{scholarship.name}</h3>
                    <p className="text-gray-700">{scholarship.description}</p>
                    <p className="text-sm text-gray-600">Eligibility: {scholarship.eligibility}</p>
                    <a href={scholarship.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Learn More →
                    </a>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-700">Based on your current Poverty Index Score, you may not be eligible for these scholarships. However, we encourage you to explore other financial aid options or improve your score by addressing the factors mentioned in your assessment.</p>
          )}
          <button
            onClick={onBack}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="mr-2" /> Back to Results
          </button>
        </motion.div>
      </div>
    </div>
  );
}