import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

export default function Form({ onSubmit, onCancel }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    annualIncome: '',
    familySize: '',
    drinkingWater: '',
    housingType: '',
    educationLevel: ''
  });

  const totalSteps = 3;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const score = calculatePovertyScore(formData);
    onSubmit(score);
  };

  const calculatePovertyScore = (data) => {
    let score = 0;
    const annualIncomePerCapita = data.annualIncome / data.familySize;

    // Income score (based on Tendulkar Committee methodology)
    if (annualIncomePerCapita < 27000) score += 40; // Below poverty line
    else if (annualIncomePerCapita < 54000) score += 30;
    else if (annualIncomePerCapita < 108000) score += 20;

    // Water score
    if (data.drinkingWater === 'Poor') score += 20;
    else if (data.drinkingWater === 'Average') score += 10;

    // Housing score
    if (data.housingType === 'Kutcha') score += 20;
    else if (data.housingType === 'Semi-Pucca') score += 10;

    // Education score
    if (data.educationLevel === 'Illiterate') score += 20;
    else if (data.educationLevel === 'Primary') score += 15;
    else if (data.educationLevel === 'Secondary') score += 10;

    return Math.min(score, 100);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Poverty Assessment Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {currentStep === 1 && (
              <>
                <div>
                  <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700">
                    Annual Income (in ₹)
                  </label>
                  <input
                    type="number"
                    id="annualIncome"
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="familySize" className="block text-sm font-medium text-gray-700">
                    Family Size
                  </label>
                  <input
                    type="number"
                    id="familySize"
                    name="familySize"
                    value={formData.familySize}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                <div>
                  <label htmlFor="drinkingWater" className="block text-sm font-medium text-gray-700">
                    Drinking Water Quality
                  </label>
                  <select
                    id="drinkingWater"
                    name="drinkingWater"
                    value={formData.drinkingWater}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="">Select quality</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="housingType" className="block text-sm font-medium text-gray-700">
                    Housing Type
                  </label>
                  <select
                    id="housingType"
                    name="housingType"
                    value={formData.housingType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="">Select housing type</option>
                    <option value="Pucca">Pucca (Permanent)</option>
                    <option value="Semi-Pucca">Semi-Pucca (Semi-Permanent)</option>
                    <option value="Kutcha">Kutcha (Temporary)</option>
                  </select>
                </div>
              </>
            )}
            {currentStep === 3 && (
              <div>
                <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700">
                  Highest Education Level in Family
                </label>
                <select
                  id="educationLevel"
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                >
                  <option value="">Select education level</option>
                  <option value="Illiterate">Illiterate</option>
                  <option value="Primary">Primary</option>
                  <option value="Secondary">Secondary</option>
                  <option value="Higher">Higher Education</option>
                </select>
              </div>
            )}
            <div className="flex justify-between mt-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ArrowLeft className="mr-2" /> Previous
                </button>
              )}
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Next <ArrowRight className="ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit <Check className="ml-2" />
                </button>
              )}
            </div>
          </form>
          <button
            onClick={onCancel}
            className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        </motion.div>
      </div>
    </div>
  );
}